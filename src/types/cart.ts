import type { ID, ItemQuantity } from "./index";

export interface ICartItem {
  product: ID;
  variant?: ID;
  color?: string;
  size?: string;
  itemQuantity: ItemQuantity;
  addedAt: Date;
}

export interface IPopulatedCartItem extends Omit<ICartItem, "product"> {
  product: {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    regularPrice: number;
    salePrice?: number;
    stockQuantity: number;
    status: string;
    category?: {
      slug: string;
    };
  };
  subtotal: number;
}

export interface ICart {
  user?: ID;
  sessionId?: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}
