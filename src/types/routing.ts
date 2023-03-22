export enum RoutePath {
  MainPage = "/",
  CartPage = "/cart",
  SignUpPage = "/signup",
  SignInPage = "/signin",
  CreateProductPage = "/create-product",
  ProductPage = "/product",
  EditProductPage = "/edit-product",
}

export interface RouteConfig {
  title: string;
  path: string;
}
