export enum UserRole {
  Client = "Client",
  Admin = "Admin",
}

export enum UserStatus {
  Loading = "Loading",
  Unauthorized = "Unauthorized",
  Authorized = "Authorized",
}

export type Cart = Record<string, number>; // Объект, у которого ключи - айдишники продуктов, а соответствующие значения - количество таких продуктов, которые были добавлены в корзину.

// Информация о клиенте
export interface ClientData {
  cart: Cart;
  uid: string;
}

// В таком формате данные юзера скачиваются из базы данных.
export type UserData =
  | {
      role: UserRole.Admin;
    }
  | {
      role: UserRole.Client;
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
