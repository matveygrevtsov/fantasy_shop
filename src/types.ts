import { ProductCategory, ProductsSortType } from "./constants/enums";

export interface CreateProductFormData {
  name: string;
  description: string;
  images: File[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export interface SearchProductsParams {
  searchString: string;
  productsCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}
