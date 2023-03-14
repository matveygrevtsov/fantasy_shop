import { RouteName, UserStatus } from "./enums";

interface RouteConfig {
  path: string;
  showInHeader: Record<UserStatus, boolean>;
}

export const routes: Record<RouteName, RouteConfig> = {
  [RouteName.MainPage]: {
    path: `/`,
    showInHeader: {
      [UserStatus.Loading]: true,
      [UserStatus.Error]: true,
      [UserStatus.Guest]: true,
      [UserStatus.Client]: true,
      [UserStatus.Admin]: true,
    },
  },
  [RouteName.CartPage]: {
    path: `/cart`,
    showInHeader: {
      [UserStatus.Loading]: false,
      [UserStatus.Error]: false,
      [UserStatus.Guest]: false,
      [UserStatus.Client]: true,
      [UserStatus.Admin]: false,
    },
  },
  [RouteName.SignUpPage]: {
    path: `/signup`,
    showInHeader: {
      [UserStatus.Loading]: true,
      [UserStatus.Error]: true,
      [UserStatus.Guest]: true,
      [UserStatus.Client]: false,
      [UserStatus.Admin]: false,
    },
  },
  [RouteName.SignInPage]: {
    path: `/signin`,
    showInHeader: {
      [UserStatus.Loading]: true,
      [UserStatus.Error]: true,
      [UserStatus.Guest]: true,
      [UserStatus.Client]: false,
      [UserStatus.Admin]: false,
    },
  },
  [RouteName.CreateProductPage]: {
    path: `/create-product`,
    showInHeader: {
      [UserStatus.Loading]: false,
      [UserStatus.Error]: false,
      [UserStatus.Guest]: false,
      [UserStatus.Client]: false,
      [UserStatus.Admin]: true,
    },
  },
};
