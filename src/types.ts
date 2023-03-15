import { ProductCategory, ProductsSortType } from "./constants/enums";

export interface CreateProductFormData {
  name: string;
  description: string;
  images: File[];
}

export interface Product {
  name: string;
  description: string;
  images: string[];
}

export interface SearchProductsParams {
  searchString: string;
  productsCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}
