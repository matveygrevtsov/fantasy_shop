import { ProductCategory, ProductsSortType } from "../../constants/enums";

export interface SearchParams {
  productCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}

export interface SearchProductsFormState {
  searchString: string;
  searchParams: SearchParams;
}
