import type { ID } from "./index";

export interface ICategory {
  _id: ID;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: ID; // Self-reference — parent category _id
  products: ID[]; // Product _id array
  seoTitle?: string;
  seoDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}
