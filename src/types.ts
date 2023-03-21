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

// В таком формате данные юзера скачиваются из базы данных.
export type UserData =
  | {
      role: UserRole.Admin;
    }
  | {
      role: UserRole.Client;
      cart: string[];
      orders: string[];
    };

// В таком формате данные юзера хранятся в сторе.
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
