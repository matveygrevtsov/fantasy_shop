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

// Информация о клиенте
export interface ClientData {
  cart: Record<string, number>; // Объект, у которого ключи - айдишники продуктов, а соответствующие значения - количество таких продуктов, которые были добавлены в корзину.
}

// В таком формате данные юзера скачиваются из базы данных.
export type UserData =
  | {
      role: UserRole.Admin;
    }
  | {
      role: UserRole.Client;
      uid: string;
      clientData: ClientData;
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
