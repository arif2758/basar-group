// src/data/granthagar/types.ts

export interface IBookDescriptionItem {
  id: string;
  title: string;
  subDescription: string[];
}

export interface IBookDescriptionSection {
  id: string;
  description1?: IBookDescriptionItem[];
  description2?: IBookDescriptionItem[];
  description3?: IBookDescriptionItem[];
  description4?: IBookDescriptionItem[];
  description5?: IBookDescriptionItem[];
  description6?: IBookDescriptionItem[];
  description7?: IBookDescriptionItem[];
  [key: string]: any;
}

export interface ICurrentBorrower {
  userId?: string;
  name: string;
  addressZone?: string;
  phone?: string;
  borrowedAt: string | Date;
  returnExpectedAt: string | Date;
  status: "reading" | "returned";
}

export interface IBookDonor {
  name: string;
  zone?: string;
  note?: string;
  donatedAt?: string;
}

export interface IBookCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  count?: number;
  isActive?: boolean;
}

export interface IBook {
  _id?: string;
  productId: string;
  title: string;
  slug: string;
  author: string;
  category: string; // category slug e.g. "novels", "literature"
  categoryName?: string; // e.g. "উপন্যাস"
  tags: string[];
  thumbnail: string;
  extraImages: string[];
  shortDesc: string;
  description: IBookDescriptionSection[];
  publisher?: string;
  publishYear?: number;
  pages?: number;
  language?: string;
  edition?: string;
  totalQuantity: number;
  availableQuantity: number;
  donor?: IBookDonor;
  currentBorrower?: ICurrentBorrower;
  status: "available" | "borrowed" | "maintenance";
}

export type BorrowDuration = 1 | 3 | 5 | 7;

export type DeliveryMethod =
  | "self_pickup"
  | "standard_delivery"
  | "electric_bike"
  | "drone";

export interface IBookCartItem {
  book: IBook;
  quantity: number;
}

export interface IShippingAddress {
  recipientName: string;
  phone: string;
  altPhone?: string;
  villageOrArea?: string;
  fullAddress: string;
  notes?: string;
}

export interface IBookBorrow {
  _id?: string;
  borrowCode: string;
  user?: {
    userId: string;
    name: string;
    phone: string;
    email?: string;
  };
  items: {
    bookId: string;
    productId: string;
    title: string;
    author: string;
    thumbnail: string;
    quantity: number;
  }[];
  durationDays: BorrowDuration;
  borrowDate: string | Date;
  expectedReturnDate: string | Date;
  actualReturnDate?: string | Date;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  bookBorrowFee: number;
  totalAmount: number;
  shippingAddress?: IShippingAddress;
  pledgeAgreed: boolean;
  paymentMethod?: "cod" | "mobile" | "none";
  paymentProvider?: "bkash" | "nagad" | "rocket";
  senderNumber?: string;
  transactionId?: string;
  paymentStatus?: "pending" | "paid" | "not_required";
  status:
    | "pending"
    | "approved"
    | "accepted"
    | "dispatched"
    | "in_transit"
    | "delivered"
    | "in_return"
    | "returned"
    | "overdue"
    | "cancelled";
  createdAt?: string | Date;
}
