export enum RoutePath {
  MainPage = "/",
  CartPage = "/cart",
  SignUpPage = "/signup",
  SignInPage = "/signin",
  CreateProductPage = "/create-product",
  ProductPage = "/product",
  EditProductPage = "/edit-product",
}

export enum ProductCategory {
  Goblins = "Goblins",
  Orks = "Orks",
  Dwarfs = "Dwarfs",
}

export enum ProductsSortType {
  AscendingOrderPrice = "AscendingOrderPrice", // По возрастанию цены
  DescendingOrderPrice = "DescendingOrderPrice", // По убыванию цены
}

export enum SignUpFormInput {
  Email = "Email",
  Password = "Password",
  RepeatPassword = "RepeatPassword",
}

export enum SignInFormInput {
  Email = "Email",
  Password = "Password",
}

export enum FirebaseErrors {
  AuthUserNotFound = "auth/user-not-found", // Пользователь с таким email не найден.
  AuthWrongPassword = "auth/wrong-password", // Невалидный пароль
  AuthEmailAlreadyInUse = "auth/email-already-in-use", // Предоставленный адрес электронной почты уже используется существующим пользователем.
}

export enum UserRole {
  Client = "Client",
  Admin = "Admin",
}

export enum UserStatus {
  Loading = "Loading",
  Unauthorized = "Unauthorized",
  Authorized = "Authorized",
}
