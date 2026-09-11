"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Avatar,
  Popconfirm,
  Select,
  Input,
  Tooltip,
  Tabs,
  Badge,
  App,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  User as UserIcon,
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  GitPullRequestDraft,
  Phone,
  Mail,
  Calendar,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  TreePine,
  UserCheck,
  UserX,
  MessageSquare,
  Trash2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import dayjs from "dayjs";
import { UserRole, AccountType } from "@/types/enums";

export interface IUserFamilyRequest {
  _id: string;
  title: string;
  gender?: string;
  parentKey: string;
  parentName?: string;
  status: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface IAdminUserItem {
  _id: string;
  fullname: string;
  email: string;
  mobile?: string;
  role: string;
  accountType: string;
  isFamilyMember: boolean;
  genId?: string;
  profilePicture?: string;
  createdAt: string;
  lastLogin?: string;
  familyRequests: IUserFamilyRequest[];
}

export interface AdminUsersDoubleLayerTableProps {
  users: IAdminUserItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onToggleFamilyStatus: (userId: string, nextStatus: boolean, genId?: string) => Promise<void>;
  onUpdateGenId?: (userId: string, newGenId: string) => Promise<void>;
  onUpdateRole?: (userId: string, newRole: string) => Promise<void>;
  onUpdateAccountType?: (userId: string, newType: string) => Promise<void>;
  onDeleteUser?: (userId: string) => Promise<void>;
  /**
   * If true, emphasizes family tree columns (default: false)
   */
  mode?: "family-tree" | "general-users";
}

export default function AdminUsersDoubleLayerTable({
  users,
  isLoading,
  onRefresh,
  onToggleFamilyStatus,
  onUpdateGenId,
  onUpdateRole,
  onUpdateAccountType,
  onDeleteUser,
  mode = "general-users",
}: AdminUsersDoubleLayerTableProps) {
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "member" | "non_member">(
    mode === "family-tree" ? "member" : "all"
  );
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>("all");
  const [updatingField, setUpdatingField] = useState<Record<string, boolean>>({});
  const [mobileExpandedIds, setMobileExpandedIds] = useState<string[]>([]);

  const toggleMobileExpanded = (id: string) => {
    setMobileExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ── Role Color & Dot Helper (Clean, Minimal & High Contrast) ──
  const getRoleTheme = (role: string) => {
    const r = (role || "").toUpperCase();
    switch (r) {
      case "ADMIN":
        return { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400 font-bold" };
      case "SUPER_ADMIN":
        return { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400 font-bold" };
      case "MANAGER":
        return { dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400 font-bold" };
      case "OPERATOR":
        return { dot: "bg-cyan-500", text: "text-cyan-600 dark:text-cyan-400 font-bold" };
      case "MODERATOR":
        return { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400 font-bold" };
      case "VOLUNTEER":
        return { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400 font-bold" };
      case "LIBRARIAN":
        return { dot: "bg-teal-500", text: "text-teal-600 dark:text-teal-400 font-bold" };
      case "INSTRUCTOR":
        return { dot: "bg-sky-500", text: "text-sky-600 dark:text-sky-400 font-bold" };
      default:
        return { dot: "bg-blue-500", text: "text-blue-600 dark:text-blue-400 font-bold" };
    }
  };

  // ── Role Badge Pill Helper (For mobile/badges) ──
  const getRoleBadge = (role: string) => {
    const theme = getRoleTheme(role);
    return theme.text;
  };

  // ── Role Color Helper ──
  const getRoleColor = (role: string) => {
    const r = (role || "").toUpperCase();
    switch (r) {
      case "ADMIN":
        return "gold";
      case "SUPER_ADMIN":
        return "error";
      case "MANAGER":
        return "purple";
      case "OPERATOR":
        return "cyan";
      case "MODERATOR":
        return "purple";
      case "VOLUNTEER":
        return "cyan";
      case "LIBRARIAN":
        return "green";
      case "INSTRUCTOR":
        return "geekblue";
      default:
        return "blue";
    }
  };

  // ── Account Type Color Helper ──
  const getAccountTypeColor = (type: string) => {
    const t = (type || "").toUpperCase();
    switch (t) {
      case "TRIAL":
        return "default";
      case "BRONZE":
        return "orange";
      case "SILVER":
        return "default";
      case "GOLD":
        return "gold";
      case "PLATINUM":
        return "cyan";
      case "DIAMOND":
        return "blue";
      case "EMERALD":
        return "green";
      case "PREMIUM":
        return "gold";
      case "LIFETIME":
        return "purple";
      case "STUDENT":
        return "cyan";
      case "CORPORATE":
        return "magenta";
      case "ROYAL":
        return "purple";
      default:
        return "default";
    }
  };

  // ── WhatsApp URL Helper ──
  const getWhatsAppLink = (phone?: string) => {
    if (!phone) return "";
    const clean = phone.replace(/[^0-9]/g, "");
    const formatted = clean.startsWith("88") ? clean : `88${clean}`;
    return `https://wa.me/${formatted}`;
  };

  // ── Filtered Users List ──
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchText.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.fullname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.mobile && u.mobile.includes(q)) ||
        (u.genId && u.genId.includes(q)) ||
        (u.role && u.role.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "member" && u.isFamilyMember) ||
        (statusFilter === "non_member" && !u.isFamilyMember);

      const matchesRole =
        roleFilter === "all" || u.role.toUpperCase() === roleFilter.toUpperCase();

      const matchesAccountType =
        accountTypeFilter === "all" ||
        u.accountType.toUpperCase() === accountTypeFilter.toUpperCase();

      return matchesSearch && matchesStatus && matchesRole && matchesAccountType;
    });
  }, [users, searchText, statusFilter, roleFilter, accountTypeFilter]);

  // ── Handlers ──
  const handleToggleFamily = async (userId: string, current: boolean, genId?: string) => {
    const key = `${userId}-family`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onToggleFamilyStatus(userId, !current, genId);
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSetFamilyStatus = async (userId: string, nextStatus: boolean, genId?: string) => {
    const key = `${userId}-family`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onToggleFamilyStatus(userId, nextStatus, genId);
      message.success(
        nextStatus
          ? "ইউজারকে সফলভাবে ফ্যামিলি মেম্বার হিসেবে ভেরিফাই করা হয়েছে!"
          : "ইউজারের ফ্যামিলি মেম্বারশিপ বাতিল করা হয়েছে।"
      );
    } catch {
      message.error("ফ্যামিলি স্ট্যাটাস পরিবর্তন করতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!onUpdateRole) return;
    const key = `${userId}-role`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onUpdateRole(userId, newRole);
      message.success("ইউজার রোল আপডেট হয়েছে!");
    } catch {
      message.error("রোল আপডেট করতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleAccountTypeChange = async (userId: string, newType: string) => {
    if (!onUpdateAccountType) return;
    const key = `${userId}-accountType`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onUpdateAccountType(userId, newType);
      message.success("অ্যাকাউন্ট টাইপ আপডেট হয়েছে!");
    } catch {
      message.error("অ্যাকাউন্ট টাইপ আপডেট করতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleGenChange = async (userId: string, newGen: string) => {
    if (!onUpdateGenId) return;
    const key = `${userId}-gen`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onUpdateGenId(userId, newGen);
      message.success("প্রজন্ম (Gen ID) আপডেট হয়েছে!");
    } catch {
      message.error("Gen ID আপডেট করতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDelete = async (userId: string) => {
    if (!onDeleteUser) return;
    const key = `${userId}-delete`;
    setUpdatingField((prev) => ({ ...prev, [key]: true }));
    try {
      await onDeleteUser(userId);
      message.success("ইউজার সফলভাবে মুছে ফেলা হয়েছে।");
    } catch {
      message.error("ইউজার মুছতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingField((prev) => ({ ...prev, [key]: false }));
    }
  };

  // ── CSV Export ──
  const handleExportCSV = () => {
    if (!filteredUsers.length) {
      message.warning("এক্সপোর্ট করার মতো কোনো ডাটা নেই।");
      return;
    }

    const headers = [
      "User ID",
      "Full Name",
      "Email",
      "Mobile",
      "Role",
      "Account Type",
      "Is Family Member",
      "Generation (Gen ID)",
      "Created At",
      "Total Family Requests",
    ];

    const rows = filteredUsers.map((u) => [
      `"${u._id}"`,
      `"${u.fullname.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.mobile || ""}"`,
      `"${u.role}"`,
      `"${u.accountType}"`,
      u.isFamilyMember ? "Yes" : "No",
      `"${u.genId || ""}"`,
      `"${u.createdAt ? dayjs(u.createdAt).format("YYYY-MM-DD") : ""}"`,
      u.familyRequests.length,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `basar_group_users_${dayjs().format("YYYY-MM-DD_HHmm")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("ইউজার লিস্ট CSV ফাইল হিসেবে ডাউনলোড হয়েছে!");
  };

  // ── Desktop Table Columns ──
  const columns: ColumnsType<IAdminUserItem> = [
    {
      title: "ইউজার ও প্রোফাইল",
      key: "user",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.profilePicture || undefined}
            icon={!record.profilePicture ? <UserIcon className="size-4" /> : undefined}
            className="bg-blue-600 text-white shrink-0 ring-2 ring-blue-500/20"
          >
            {record.fullname ? record.fullname.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                {record.fullname}
              </span>
              <Tag
                color={getRoleColor(record.role)}
                className="text-[10px] uppercase font-bold py-0 px-1 m-0 rounded"
              >
                {record.role}
              </Tag>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
              {record.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "মোবাইল ও যোগাযোগ",
      dataIndex: "mobile",
      key: "mobile",
      width: 170,
      render: (mobile?: string) => {
        if (!mobile) return <span className="text-xs text-slate-400 dark:text-slate-500">—</span>;
        const waLink = getWhatsAppLink(mobile);
        return (
          <div className="flex items-center gap-2">
            <a
              href={`tel:${mobile}`}
              className="text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1"
            >
              <Phone className="size-3 text-slate-400" />
              <span>{mobile}</span>
            </a>
            {waLink && (
              <Tooltip title="হোয়াটসঅ্যাপে চ্যাট করুন">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="size-3.5" />
                </a>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "রোল",
      dataIndex: "role",
      key: "role",
      width: 155,
      render: (role: string, record) => {
        const currentTheme = getRoleTheme(role);
        return onUpdateRole ? (
          <Select
            value={role}
            onChange={(val) => handleRoleChange(record._id, val)}
            loading={updatingField[`${record._id}-role`]}
            size="small"
            className="w-full text-xs"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-role-dropdown" } }}
            options={Object.values(UserRole).map((r) => {
              const theme = getRoleTheme(r);
              return {
                value: r,
                label: (
                  <div className="flex items-center gap-2 py-0.5 whitespace-nowrap">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${theme.dot}`} />
                    <span className={`text-xs ${theme.text}`}>{r}</span>
                  </div>
                ),
              };
            })}
          />
        ) : (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full shrink-0 ${currentTheme.dot}`} />
            <span className={`text-xs ${currentTheme.text}`}>{role}</span>
          </div>
        );
      },
    },
    {
      title: "অ্যাকাউন্ট টাইপ",
      dataIndex: "accountType",
      key: "accountType",
      width: 145,
      render: (type: string, record) =>
        onUpdateAccountType ? (
          <Select
            value={type}
            onChange={(val) => handleAccountTypeChange(record._id, val)}
            loading={updatingField[`${record._id}-accountType`]}
            size="small"
            className="w-full text-xs font-semibold"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-account-type-dropdown" } }}
            options={Object.values(AccountType).map((t) => ({
              value: t,
              label: (
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  {t}
                </span>
              ),
            }))}
          />
        ) : (
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            {type}
          </span>
        ),
    },
    {
      title: "ফ্যামিলি স্ট্যাটাস",
      dataIndex: "isFamilyMember",
      key: "isFamilyMember",
      sorter: (a, b) => Number(b.isFamilyMember) - Number(a.isFamilyMember),
      width: 175,
      render: (isFamily: boolean, record) => (
        <div className="flex items-center gap-1.5">
          <Select
            value={isFamily ? "verified" : "not_joined"}
            onChange={(val) => {
              const nextStatus = val === "verified";
              handleSetFamilyStatus(record._id, nextStatus, record.genId);
            }}
            loading={updatingField[`${record._id}-family`]}
            size="small"
            className="w-[125px] text-xs font-semibold"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-status-dropdown" } }}
            options={[
              {
                value: "verified",
                label: (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>ভেরিফাইড</span>
                  </span>
                ),
              },
              {
                value: "not_joined",
                label: (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    <XCircle className="size-3.5 text-slate-400 shrink-0" />
                    <span>যুক্ত নন</span>
                  </span>
                ),
              },
            ]}
          />
          {record.familyRequests && record.familyRequests.length > 0 && (
            <Tooltip title={`${record.familyRequests.length}টি আবেদন জমা দিয়েছেন`}>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#1677ff] dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 cursor-default shrink-0">
                {record.familyRequests.length}
              </span>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "প্রজন্ম (Gen ID)",
      dataIndex: "genId",
      key: "genId",
      width: 130,
      render: (genId: string, record) => (
        <Select
          value={genId || "none"}
          onChange={(val) => handleGenChange(record._id, val === "none" ? "" : val)}
          disabled={!onUpdateGenId || updatingField[`${record._id}-gen`]}
          size="small"
          className="w-full text-xs"
          popupMatchSelectWidth={false}
          classNames={{ popup: { root: "admin-status-dropdown" } }}
          options={[
            {
              value: "none",
              label: <span className="text-xs text-slate-400 whitespace-nowrap">নির্ধারিত নয়</span>,
            },
            {
              value: "1",
              label: (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                  Gen 1 (আদি)
                </span>
              ),
            },
            {
              value: "2",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 2
                </span>
              ),
            },
            {
              value: "3",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 3
                </span>
              ),
            },
            {
              value: "4",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 4
                </span>
              ),
            },
            {
              value: "5",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 5
                </span>
              ),
            },
            {
              value: "6",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 6
                </span>
              ),
            },
            {
              value: "7",
              label: (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  Gen 7
                </span>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "যোগদান",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: string) => (
        <span className="text-xs text-slate-500 font-mono">
          {date ? dayjs(date).format("DD MMM YYYY") : "—"}
        </span>
      ),
    },
  ];

  // ── Double Layer Expanded Row (Tabs Content) ──
  const expandedRowRender = (record: IAdminUserItem) => {
    const waLink = getWhatsAppLink(record.mobile);

    const tabItems = [
      {
        key: "family",
        label: (
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <TreePine className="size-3.5 text-emerald-600" />
            <span>ফ্যামিলি ট্রি ও আবেদন ({record.familyRequests.length})</span>
          </span>
        ),
        children: (
          <div className="space-y-4 pt-2">
            {/* Quick Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl admin-nested-card shadow-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    record.isFamilyMember
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30"
                      : "bg-slate-100 text-slate-500 dark:bg-[#222222] dark:text-slate-400 border border-slate-200/50 dark:border-[#333]"
                  }`}
                >
                  <TreePine className="size-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold admin-nested-title">
                    {record.isFamilyMember
                      ? `বংশলতিকায় যুক্ত আছেন (প্রজন্ম: Gen ${record.genId || "১"})`
                      : "ফ্যামিলি ট্রিতে এখনো যুক্ত নন"}
                  </h5>
                  <p className="text-[11px] admin-nested-desc">
                    ইউজার ড্যাশবোর্ডে স্ট্যাটাস এবং ফ্যামিলি ট্রি পেইজের পারমিশন নিয়ন্ত্রণ
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                <Select
                  value={record.genId || "none"}
                  onChange={(val) => handleGenChange(record._id, val === "none" ? "" : val)}
                  size="small"
                  className="flex-1 sm:w-32 text-xs"
                  options={[
                    { value: "none", label: "Gen: নির্ধারিত নয়" },
                    { value: "1", label: "Gen 1 (আদি)" },
                    { value: "2", label: "Gen 2" },
                    { value: "3", label: "Gen 3" },
                    { value: "4", label: "Gen 4" },
                    { value: "5", label: "Gen 5" },
                    { value: "6", label: "Gen 6" },
                  ]}
                />
                <Button
                  size="small"
                  type={record.isFamilyMember ? "default" : "primary"}
                  danger={record.isFamilyMember}
                  loading={updatingField[`${record._id}-family`]}
                  onClick={() =>
                    handleToggleFamily(record._id, record.isFamilyMember, record.genId)
                  }
                  className="flex-1 sm:flex-initial text-xs"
                >
                  {record.isFamilyMember ? "পারমিশন প্রত্যাহার" : "সরাসরি পারমিশন দিন"}
                </Button>
              </div>
            </div>

            {/* Sub-Table / Inner Cards of Family Requests */}
            <div>
              <h5 className="text-xs font-bold admin-nested-title mb-2 flex items-center gap-1.5">
                <GitPullRequestDraft className="size-3.5 text-blue-500" />
                <span>এই ইউজারের জমাকৃত ফ্যামিলি ট্রি আবেদনসমূহ</span>
              </h5>

              {record.familyRequests.length === 0 ? (
                <div className="py-4 px-4 rounded-xl admin-nested-card-empty text-xs text-center">
                  এই ইউজার এখনো কোনো নতুন সদস্য যোগের আবেদন জমা দেননি।
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-[#1c1c1c] text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-[#2a2a2a]">
                        <tr>
                          <th className="py-2.5 px-3">আবেদনকৃত নাম</th>
                          <th className="py-2.5 px-3">লিঙ্গ</th>
                          <th className="py-2.5 px-3">পিতা/অভিভাবক</th>
                          <th className="py-2.5 px-3">স্ট্যাটাস</th>
                          <th className="py-2.5 px-3">আবেদনের তারিখ</th>
                          <th className="py-2.5 px-3">প্রত্যাখ্যান কারণ / মন্তব্য</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-[#242424] bg-white dark:bg-[#141414]">
                        {record.familyRequests.map((req) => (
                          <tr key={req._id} className="hover:bg-slate-50/70 dark:hover:bg-[#1c1c1c] transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                              {req.title}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  req.gender === "female"
                                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                                    : "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                }`}
                              >
                                {req.gender === "female" ? "মহিলা" : "পুরুষ"}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-mono">
                              {req.parentName || req.parentKey}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  req.status === "approved"
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : req.status === "rejected"
                                    ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                }`}
                              >
                                {req.status === "approved"
                                  ? "অনুমোদিত"
                                  : req.status === "rejected"
                                  ? "বাতিল"
                                  : "পেন্ডিং"}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 font-mono">
                              {req.createdAt ? dayjs(req.createdAt).format("DD MMM YYYY") : "—"}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 italic">
                              {req.rejectionReason || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Inner Cards View (Issue 2 Fix) */}
                  <div className="block md:hidden space-y-2.5">
                    {record.familyRequests.map((req) => (
                      <div
                        key={req._id}
                        className="p-3 rounded-xl admin-nested-card shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                                req.gender === "female"
                                  ? "bg-gradient-to-br from-rose-500 to-pink-600"
                                  : "bg-gradient-to-br from-blue-500 to-indigo-600"
                              }`}
                            >
                              {req.title ? req.title.charAt(0) : "ম"}
                            </div>
                            <div className="min-w-0">
                              <h6 className="font-bold text-xs admin-nested-title truncate">
                                {req.title}
                              </h6>
                              <p className="text-[10px] admin-nested-desc truncate">
                                অভিভাবক: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{req.parentName || req.parentKey}</span>
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              req.status === "approved"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/20"
                                : req.status === "rejected"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-500/20"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {req.status === "approved"
                              ? "অনুমোদিত"
                              : req.status === "rejected"
                              ? "বাতিল"
                              : "পেন্ডিং"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-100 dark:border-[#262626]">
                          <span>আবেদনের তারিখ: {req.createdAt ? dayjs(req.createdAt).format("DD MMM YYYY") : "—"}</span>
                          <span>{req.gender === "female" ? "মহিলা ♀" : "পুরুষ ♂"}</span>
                        </div>

                        {req.rejectionReason && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20 p-2 rounded-lg italic">
                            মন্তব্য: {req.rejectionReason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ),
      },
      {
        key: "account",
        label: (
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <ShieldCheck className="size-3.5 text-blue-600" />
            <span>অ্যাকাউন্ট ও নিরাপত্তা প্রোফাইল</span>
          </span>
        ),
        children: (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl admin-nested-card shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                ইউজার ডাটাবেজ আইডি
              </span>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300 select-all block truncate">
                {record._id}
              </span>
            </div>

            <div className="p-3.5 rounded-xl admin-nested-card shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                অ্যাকাউন্ট রোল ও টাইপ
              </span>
              <div className="flex items-center gap-1.5">
                <Tag color={getRoleColor(record.role)} className="m-0 text-[10px] font-bold">
                  {record.role}
                </Tag>
                <Tag
                  color={getAccountTypeColor(record.accountType)}
                  className="m-0 text-[10px] font-bold"
                >
                  {record.accountType}
                </Tag>
              </div>
            </div>

            <div className="p-3.5 rounded-xl admin-nested-card shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                সর্বশেষ লগইন
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Clock className="size-3 text-slate-400" />
                {record.lastLogin
                  ? dayjs(record.lastLogin).format("DD MMM YYYY, hh:mm A")
                  : "লগইন তথ্য নেই"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl admin-nested-card shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                রেজিস্ট্রেশন তারিখ
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="size-3 text-slate-400" />
                {record.createdAt
                  ? dayjs(record.createdAt).format("DD MMM YYYY, hh:mm A")
                  : "তথ্য নেই"}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "contact",
        label: (
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Phone className="size-3.5 text-cyan-600" />
            <span>দ্রুত যোগাযোগ</span>
          </span>
        ),
        children: (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* WhatsApp */}
            <div className="p-4 rounded-xl admin-nested-card shadow-xs flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  হোয়াটসঅ্যাপ চ্যাট
                </span>
                <p className="text-xs font-semibold admin-nested-title">
                  {record.mobile || "নম্বর নেই"}
                </p>
              </div>
              {waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="size-3.5" />
                  <span>চ্যাট করুন</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400">অনুপলব্ধ</span>
              )}
            </div>

            {/* Direct Phone Call */}
            <div className="p-4 rounded-xl admin-nested-card shadow-xs flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                  সরাসরি ফোন কল
                </span>
                <p className="text-xs font-semibold admin-nested-title">
                  {record.mobile || "নম্বর নেই"}
                </p>
              </div>
              {record.mobile ? (
                <a
                  href={`tel:${record.mobile}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="size-3.5" />
                  <span>কল দিন</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400">অনুপলব্ধ</span>
              )}
            </div>

            {/* Email Message */}
            <div className="p-4 rounded-xl admin-nested-card shadow-xs flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-0.5">
                  ইমেইল পাঠানো
                </span>
                <p className="text-xs font-semibold admin-nested-title truncate">
                  {record.email}
                </p>
              </div>
              <a
                href={`mailto:${record.email}`}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Mail className="size-3.5" />
                <span>মেইল করুন</span>
              </a>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#262626] shadow-inner">
        <Tabs defaultActiveKey="family" items={tabItems} size="small" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* ── Top Filter, Search & Export Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/90 dark:border-[#262626] shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <Input
            placeholder="নাম, ইমেইল, মোবাইল বা Gen খুঁজুন..."
            prefix={<Search className="size-3.5 text-slate-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-60 text-xs"
            allowClear
          />

          {/* Family Member Filter */}
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-40 text-xs"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-status-dropdown" } }}
            options={[
              { value: "all", label: "সকল ফ্যামিলি স্ট্যাটাস" },
              {
                value: "member",
                label: (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                    <span>ভেরিফাইড সদস্য</span>
                  </span>
                ),
              },
              {
                value: "non_member",
                label: (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <XCircle className="size-3 text-slate-400 shrink-0" />
                    <span>যুক্ত নন</span>
                  </span>
                ),
              },
            ]}
          />

          {/* Role Filter */}
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            className="w-36 text-xs"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-role-dropdown" } }}
            options={[
              { value: "all", label: "সকল রোল" },
              ...Object.values(UserRole).map((r) => {
                const theme = getRoleTheme(r);
                return {
                  value: r,
                  label: (
                    <div className="flex items-center gap-2 py-0.5 whitespace-nowrap">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${theme.dot}`} />
                      <span className={`text-xs ${theme.text}`}>{r}</span>
                    </div>
                  ),
                };
              }),
            ]}
          />

          {/* Account Type Filter */}
          <Select
            value={accountTypeFilter}
            onChange={setAccountTypeFilter}
            className="w-40 text-xs"
            popupMatchSelectWidth={false}
            classNames={{ popup: { root: "admin-account-type-dropdown" } }}
            options={[
              { value: "all", label: "সব অ্যাকাউন্ট টাইপ" },
              ...Object.values(AccountType).map((t) => ({
                value: t,
                label: (
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                    {t}
                  </span>
                ),
              })),
            ]}
          />
        </div>

        {/* Action Buttons & Counters */}
        <div className="flex items-center gap-2 justify-between lg:justify-end">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            মোট: <strong className="text-blue-600">{filteredUsers.length}</strong> জন
          </span>

          <div className="flex items-center gap-1.5">
            <Tooltip title="ইউজার ডাটা CSV ফাইল হিসেবে এক্সপোর্ট করুন">
              <Button
                size="small"
                icon={<FileSpreadsheet className="size-3.5 text-emerald-600" />}
                onClick={handleExportCSV}
                className="text-xs"
              >
                CSV এক্সপোর্ট
              </Button>
            </Tooltip>

            <Button
              size="small"
              icon={<RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />}
              onClick={onRefresh}
              className="text-xs"
            >
              রিফ্রেশ
            </Button>
          </div>
        </div>
      </div>

      {/* ── Desktop View: Ant Design Double-Layer Expandable Table ── */}
      <div className="hidden lg:block bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/90 dark:border-[#262626] overflow-hidden shadow-xs p-1">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 12, showSizeChanger: true }}
          expandable={{
            expandedRowRender,
            rowExpandable: () => true,
          }}
          className="admin-double-layer-users-table"
        />
      </div>

      {/* ── Mobile View: Fluid Expandable Cards ── */}
      <div className="block lg:hidden space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="py-12 text-center bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/90 dark:border-[#262626] text-slate-500 text-xs">
            কোনো ইউজার পাওয়া যায়নি।
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isExpanded = mobileExpandedIds.includes(user._id);
            const waLink = getWhatsAppLink(user.mobile);

            return (
              <div
                key={user._id}
                className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/90 dark:border-[#262626] p-4 shadow-xs space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.profilePicture || undefined}
                      icon={!user.profilePicture ? <UserIcon className="size-4" /> : undefined}
                      className="bg-blue-600 text-white shrink-0"
                    >
                      {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {user.fullname}
                        </h4>
                        <span
                          className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded tracking-wide ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {user.isFamilyMember ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200">
                      মেম্বার
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-[#262626] dark:text-slate-400">
                      সাধারণ
                    </span>
                  )}
                </div>

                {/* Mobile Quick Contacts & Gen */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-[#2a2a2a] text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">মোবাইল</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {user.mobile || "—"}
                      </span>
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-50 text-emerald-600"
                        >
                          <MessageSquare className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">প্রজন্ম (Gen ID)</span>
                    <Select
                      value={user.genId || "none"}
                      onChange={(val) => handleGenChange(user._id, val === "none" ? "" : val)}
                      disabled={!onUpdateGenId}
                      size="small"
                      className="w-full mt-0.5 text-xs"
                      popupMatchSelectWidth={false}
                      classNames={{ popup: { root: "admin-status-dropdown" } }}
                      options={[
                        { value: "none", label: "নির্ধারিত নয়" },
                        { value: "1", label: "Gen 1 (আদি)" },
                        { value: "2", label: "Gen 2" },
                        { value: "3", label: "Gen 3" },
                        { value: "4", label: "Gen 4" },
                        { value: "5", label: "Gen 5" },
                      ]}
                    />
                  </div>
                </div>

                {/* Mobile Quick Status & Details Toggle */}
                <div className="pt-2 border-t border-slate-100 dark:border-[#2a2a2a] flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <Select
                      value={user.isFamilyMember ? "verified" : "not_joined"}
                      onChange={(val) => {
                        const nextStatus = val === "verified";
                        handleSetFamilyStatus(user._id, nextStatus, user.genId);
                      }}
                      loading={updatingField[`${user._id}-family`]}
                      size="small"
                      className="w-full text-xs font-semibold"
                      popupMatchSelectWidth={false}
                      classNames={{ popup: { root: "admin-status-dropdown" } }}
                      options={[
                        {
                          value: "verified",
                          label: (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="size-3 text-emerald-500" />
                              <span>ভেরিফাইড</span>
                            </span>
                          ),
                        },
                        {
                          value: "not_joined",
                          label: (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              <XCircle className="size-3 text-slate-400" />
                              <span>যুক্ত নন</span>
                            </span>
                          ),
                        },
                      ]}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMobileExpanded(user._id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#333] text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1 shrink-0"
                  >
                    <span>{isExpanded ? "লুকান" : "বিস্তারিত"}</span>
                    {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                  </button>
                </div>

                {/* Mobile Expanded Tab Details */}
                {isExpanded && (
                  <div className="pt-2">{expandedRowRender(user)}</div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
