import { ICategory } from "./category";
import type { ID, Price, StockQuantity, ProductStatus } from "./index";

export interface IProductVariantAttribute {
  attributeName: string; // 'Color', 'Size', 'Storage'
  attributeValue: string; // 'Red', 'XL', '256GB'
}

export interface IProductVariant {
  variantSku: string;
  variantTitle: string; // 'Red - XL', '256GB - Silver'
  regularPrice: Price;
  salePrice?: Price;
  stockQuantity: StockQuantity;
  variantImages: string[];
  variantAttributes: IProductVariantAttribute[];
}

export interface IProductImage {
  url: string;
  alt: string;
  order: number;
}

export interface IProductSpecification {
  key: string;
  value: string;
}

export interface IProduct {
  _id: ID;
  category: ID | ICategory;
  title: string;
  slug: string;
  sku: string;
  shortDesc: string;
  description: string;
  regularPrice: Price;
  salePrice?: Price;
  costPrice?: Price;
  targetAdCost?: Price;
  stockQuantity: StockQuantity;
  thumbnail: string;
  images: IProductImage[];

  status: ProductStatus;

  brand?: ID;
  variants: IProductVariant[];
  supplier?: string;

  weight?: number;
  colors?: string[];
  sizes?: string[];

  seoTitle?: string;
  seoDesc?: string;
  tags: string[];
  features: string[];
  specifications: IProductSpecification[];

  featured: boolean;
  trending: boolean;
  bestseller: boolean;

  ratings: {
    average: number;
    count: number;
  };

  createdAt: Date;
  updatedAt: Date;
}
