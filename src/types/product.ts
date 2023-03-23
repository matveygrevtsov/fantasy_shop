import { ImageInStore } from "./store";

export enum ProductCategory {
  Goblins = "Goblins",
  Orks = "Orks",
  Dwarfs = "Dwarfs",
}

export enum ProductsSortType {
  AscendingOrderPrice = "AscendingOrderPrice", // По возрастанию цены
  DescendingOrderPrice = "DescendingOrderPrice", // По убыванию цены
}

export interface CreateProductFormValues {
  name: string;
  description: string;
  price: number;
  amount: number;
  productCategories: ProductCategory[];
  images: File[];
}

export interface EditProductFormValues {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  productCategories: ProductCategory[];
  imagesToRemove: ImageInStore[];
  imagesToUpload: File[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  productCategories: ProductCategory[];
  images: ImageInStore[];
}

export interface SearchProductsParams {
  searchString: string;
  productsCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}
