import {
  ProductCategory,
  ProductsSortType,
  UserRole,
  UserStatus,
} from "./constants/enums";

export interface CreateProductFormData {
  name: string;
  description: string;
  price: number;
  amount: number;
  productCategories: ProductCategory[];
  images: File[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  productCategories: ProductCategory[];
  images: string[];
}

export interface SearchProductsParams {
  searchString: string;
  productsCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}

export interface UserData {
  role: UserRole;
}

export type UserState =
  | {
      status: UserStatus.Loading | UserStatus.Unauthorized;
    }
  | {
      status: UserStatus.Authorized;
      data: UserData;
    };

export interface RouteConfig {
  title: string;
  path: string;
}
