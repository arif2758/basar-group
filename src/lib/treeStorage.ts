import fs from "fs";
import path from "path";
import { connectToDatabase } from "./mongodb";
import { FamilyMemberModel } from "@/models/FamilyMember";
import { FamilyRequestModel, IFamilyRequestDocument } from "@/models/FamilyRequest";
import { familyTreeData, FamilyMember, FlatFamilyMember } from "@/data/familyData";
import {
  flattenMembersWithParent,
  buildTreeFromFlatList,
  generateNextChildKey,
  findMemberByKey,
} from "@/utils/familyUtils";

const FALLBACK_DIR = path.join(process.cwd(), "src", "data");
const FALLBACK_TREE_FILE = path.join(FALLBACK_DIR, "persisted-tree.json");
const FALLBACK_REQUESTS_FILE = path.join(FALLBACK_DIR, "persisted-requests.json");

// Helper to safely read JSON file
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return defaultValue;
}

// Helper to safely write JSON file
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
  }
}

// ─────────────────────────────────────────────
// 1. ট্রি ও মেম্বার সার্ভিস (Tree & Member Services)
// ─────────────────────────────────────────────

// সকল ফ্ল্যাট মেম্বার পাওয়া (MongoDB অথবা ফলব্যাক ফাইল)
export async function getAllFlatMembers(): Promise<{
  members: FlatFamilyMember[];
  source: "mongodb" | "fallback";
}> {
  const db = await connectToDatabase();

  if (db) {
    try {
      let count = await FamilyMemberModel.countDocuments();
      if (count === 0) {
        // ডাটাবেজ প্রথমবার তৈরি হলে সিড ডাটা ইনসার্ট করা
        const defaultFlat = flattenMembersWithParent(familyTreeData);
        await FamilyMemberModel.insertMany(defaultFlat);
        count = defaultFlat.length;
      }

      const docs = await FamilyMemberModel.find({}).sort({ generation: 1, key: 1 }).lean();
      const members: FlatFamilyMember[] = docs.map((d) => ({
        key: d.key,
        title: d.title,
        gender: d.gender,
        generation: d.generation,
        parentKey: d.parentKey,
        birthYear: d.birthYear,
        deathYear: d.deathYear,
        isAlive: d.isAlive,
        phone: d.phone,
        address: d.address,
        profession: d.profession,
        spouse: d.spouse,
        bio: d.bio,
      }));

      return { members, source: "mongodb" };
    } catch (e) {
      console.error("MongoDB query failed, falling back to local file:", e);
    }
  }

  // Fallback to local file
  const fallbackMembers = readJsonFile<FlatFamilyMember[]>(
    FALLBACK_TREE_FILE,
    flattenMembersWithParent(familyTreeData)
  );

  return { members: fallbackMembers, source: "fallback" };
}

// সম্পূর্ণ নেস্টেড ট্রি পাওয়া
export async function getCompleteFamilyTree(): Promise<{
  tree: FamilyMember[];
  source: "mongodb" | "fallback";
  totalMembers: number;
}> {
  const { members, source } = await getAllFlatMembers();
  const tree = buildTreeFromFlatList(members);
  return {
    tree,
    source,
    totalMembers: members.length,
  };
}

// সরাসরি মেম্বার যুক্ত করা (অ্যাডমিন বা অ্যাপ্রুভাল সিস্টেম)
export async function insertFamilyMember(
  parentKey: string,
  memberData: Omit<FlatFamilyMember, "key" | "generation" | "parentKey">
): Promise<{ success: boolean; member?: FlatFamilyMember; error?: string }> {
  const { members, source } = await getAllFlatMembers();
  const currentTree = buildTreeFromFlatList(members);

  const parent = findMemberByKey(currentTree, parentKey);
  if (!parent) {
    return { success: false, error: `Parent with key ${parentKey} not found.` };
  }

  // নতুন অর্থবোধক আইডি তৈরি
  const nextKey = generateNextChildKey(parent.key, parent.children);
  const newMember: FlatFamilyMember = {
    ...memberData,
    key: nextKey,
    generation: parent.generation + 1,
    parentKey: parent.key,
  };

  const db = await connectToDatabase();
  if (db && source === "mongodb") {
    try {
      await FamilyMemberModel.create(newMember);
      return { success: true, member: newMember };
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, error: err.message };
    }
  }

  // Save to fallback file
  const updatedMembers = [...members, newMember];
  writeJsonFile(FALLBACK_TREE_FILE, updatedMembers);

  return { success: true, member: newMember };
}

// সদস্যের তথ্য সম্পাদন (Update)
export async function updateFamilyMember(
  key: string,
  updateFields: Partial<FlatFamilyMember>
): Promise<{ success: boolean; member?: FlatFamilyMember; error?: string }> {
  // Disallow changing key or generation via edit
  const safeUpdates = { ...updateFields };
  delete safeUpdates.key;
  delete safeUpdates.generation;
  delete safeUpdates.parentKey;

  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await FamilyMemberModel.findOneAndUpdate(
        { key },
        { $set: safeUpdates },
        { new: true }
      ).lean();
      if (updated) {
        return {
          success: true,
          member: {
            key: updated.key,
            title: updated.title,
            gender: updated.gender,
            generation: updated.generation,
            parentKey: updated.parentKey,
            birthYear: updated.birthYear,
            deathYear: updated.deathYear,
            isAlive: updated.isAlive,
            phone: updated.phone,
            address: updated.address,
            profession: updated.profession,
            spouse: updated.spouse,
            bio: updated.bio,
          },
        };
      }
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, error: err.message };
    }
  }

  // Fallback
  const { members } = await getAllFlatMembers();
  const idx = members.findIndex((m) => m.key === key);
  if (idx === -1) {
    return { success: false, error: `Member with key ${key} not found.` };
  }

  const updatedItem = { ...members[idx], ...safeUpdates };
  members[idx] = updatedItem;
  writeJsonFile(FALLBACK_TREE_FILE, members);

  return { success: true, member: updatedItem };
}

// সদস্য ও তার সকল বংশধরদের ডিলিট করা
export async function deleteFamilyMember(
  key: string
): Promise<{ success: boolean; deletedKeys: string[]; error?: string }> {
  if (key === "1") {
    return { success: false, deletedKeys: [], error: "মূল আদি শিকড় (Root) মুছে ফেলা সম্ভব নয়।" };
  }

  const { members } = await getAllFlatMembers();
  // Find all keys starting with this key prefix
  // In our semantic notation: any descendant key either matches `key` or starts with `key-`
  const keyPrefix = `${key}-`;
  const toDelete = members.filter((m) => m.key === key || m.key.startsWith(keyPrefix));
  const deletedKeys = toDelete.map((m) => m.key);

  const db = await connectToDatabase();
  if (db) {
    try {
      await FamilyMemberModel.deleteMany({ key: { $in: deletedKeys } });
      return { success: true, deletedKeys };
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, deletedKeys: [], error: err.message };
    }
  }

  // Fallback
  const remaining = members.filter((m) => !deletedKeys.includes(m.key));
  writeJsonFile(FALLBACK_TREE_FILE, remaining);

  return { success: true, deletedKeys };
}

// ডাটাবেজ প্রাথমিক রূপ বা সিড করা (Admin Reset/Seed)
export async function seedDefaultFamilyTree(): Promise<{
  success: boolean;
  count: number;
  source: "mongodb" | "fallback";
}> {
  const defaultFlat = flattenMembersWithParent(familyTreeData);
  const db = await connectToDatabase();

  if (db) {
    await FamilyMemberModel.deleteMany({});
    await FamilyMemberModel.insertMany(defaultFlat);
    return { success: true, count: defaultFlat.length, source: "mongodb" };
  }

  writeJsonFile(FALLBACK_TREE_FILE, defaultFlat);
  return { success: true, count: defaultFlat.length, source: "fallback" };
}

// ─────────────────────────────────────────────
// 2. আবেদন সংক্রান্ত সার্ভিস (Request Services)
// ─────────────────────────────────────────────

export interface IFamilyRequestItem {
  id: string;
  title: string;
  gender: "male" | "female";
  parentKey: string;
  parentName?: string;
  suggestedKey?: string;
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
  submitterName?: string;
  submitterPhone?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

// নতুন আবেদন তৈরি (পাবলিক ফরম থেকে)
export async function createMemberRequest(
  data: Omit<IFamilyRequestItem, "id" | "status" | "createdAt">
): Promise<{ success: boolean; id: string; error?: string }> {
  const db = await connectToDatabase();

  if (db) {
    try {
      const doc = await FamilyRequestModel.create({
        ...data,
        status: "pending",
      });
      return { success: true, id: doc._id.toString() };
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, id: "", error: err.message };
    }
  }

  // Fallback
  const requests = readJsonFile<IFamilyRequestItem[]>(FALLBACK_REQUESTS_FILE, []);
  const newReq: IFamilyRequestItem = {
    ...data,
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  requests.unshift(newReq);
  writeJsonFile(FALLBACK_REQUESTS_FILE, requests);

  return { success: true, id: newReq.id };
}

// সকল আবেদন দেখা (অ্যাডমিন)
export async function getAllMemberRequests(): Promise<IFamilyRequestItem[]> {
  const db = await connectToDatabase();

  if (db) {
    try {
      const docs = await FamilyRequestModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map((d: any) => ({
        id: d._id.toString(),
        title: d.title,
        gender: d.gender,
        parentKey: d.parentKey,
        parentName: d.parentName,
        suggestedKey: d.suggestedKey,
        birthYear: d.birthYear,
        deathYear: d.deathYear,
        isAlive: d.isAlive,
        phone: d.phone,
        address: d.address,
        profession: d.profession,
        spouse: d.spouse,
        bio: d.bio,
        submitterName: d.submitterName,
        submitterPhone: d.submitterPhone,
        status: d.status,
        rejectionReason: d.rejectionReason,
        createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch (e) {
      console.error("Failed to fetch requests from MongoDB:", e);
    }
  }

  return readJsonFile<IFamilyRequestItem[]>(FALLBACK_REQUESTS_FILE, []);
}

// আবেদন অনুমোদন (Approve Request & Insert Member)
export async function approveMemberRequest(
  requestId: string
): Promise<{ success: boolean; member?: FlatFamilyMember; error?: string }> {
  const requests = await getAllMemberRequests();
  const cleanId = String(requestId || "").trim();
  const req = requests.find((r) => String(r.id).trim() === cleanId);

  if (!req) {
    return { success: false, error: "আবেদনটি খুঁজে পাওয়া যায়নি।" };
  }

  if (req.status === "approved") {
    return { success: false, error: "এই আবেদনটি ইতিমধ্যেই অনুমোদিত হয়েছে।" };
  }

  // ১. মেম্বার ইনসার্ট করা
  const insertResult = await insertFamilyMember(req.parentKey, {
    title: req.title,
    gender: req.gender,
    birthYear: req.birthYear,
    deathYear: req.deathYear,
    isAlive: req.isAlive,
    phone: req.phone,
    address: req.address,
    profession: req.profession,
    spouse: req.spouse,
    bio: req.bio,
  });

  if (!insertResult.success || !insertResult.member) {
    return { success: false, error: insertResult.error || "সদস্য যোগ করতে ব্যর্থ হয়েছে।" };
  }

  // ২. স্ট্যাটাস আপডেট
  const db = await connectToDatabase();
  if (db) {
    try {
      await FamilyRequestModel.findByIdAndUpdate(cleanId, {
        status: "approved",
      });
    } catch (e) {
      console.error("Failed to update request status in MongoDB:", e);
    }
  } else {
    const allReqs = readJsonFile<IFamilyRequestItem[]>(FALLBACK_REQUESTS_FILE, []);
    const match = allReqs.find((r) => String(r.id).trim() === cleanId);
    if (match) {
      match.status = "approved";
      writeJsonFile(FALLBACK_REQUESTS_FILE, allReqs);
    }
  }

  return { success: true, member: insertResult.member };
}

// আবেদন প্রত্যাখ্যান (Reject Request)
export async function rejectMemberRequest(
  requestId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const cleanId = String(requestId || "").trim();
  const db = await connectToDatabase();

  if (db) {
    try {
      await FamilyRequestModel.findByIdAndUpdate(cleanId, {
        status: "rejected",
        rejectionReason: reason || "অসম্পূর্ণ বা তথ্য যাচাই করা সম্ভব হয়নি।",
      });
      return { success: true };
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, error: err.message };
    }
  }

  const allReqs = readJsonFile<IFamilyRequestItem[]>(FALLBACK_REQUESTS_FILE, []);
  const match = allReqs.find((r) => String(r.id).trim() === cleanId);
  if (match) {
    match.status = "rejected";
    match.rejectionReason = reason || "অসম্পূর্ণ বা তথ্য যাচাই করা সম্ভব হয়নি।";
    writeJsonFile(FALLBACK_REQUESTS_FILE, allReqs);
    return { success: true };
  }

  return { success: false, error: "আবেদনটি পাওয়া যায়নি।" };
}
