import { ProductCategory, ProductsSortType } from "./constants/enums";

export interface Product {
  name: string;
  description: string;
  image: string;
}

export interface SearchProductsParams {
  searchString: string;
  productsCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}
