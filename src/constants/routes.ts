import { RouteName } from "./enums";

interface RouteConfig {
  path: string;
  showInNavBarForGuest: boolean;
  showInNavBarForLoggedIn: boolean;
}

export const routes: Record<RouteName, RouteConfig> = {
  [RouteName.MainPage]: {
    path: `/`,
    showInNavBarForGuest: true,
    showInNavBarForLoggedIn: true,
  },
  [RouteName.CartPage]: {
    path: `/cart`,
    showInNavBarForGuest: false,
    showInNavBarForLoggedIn: true,
  },
  [RouteName.SignUpPage]: {
    path: `/signup`,
    showInNavBarForGuest: true,
    showInNavBarForLoggedIn: false,
  },
  [RouteName.SignInPage]: {
    path: `/signin`,
    showInNavBarForGuest: true,
    showInNavBarForLoggedIn: false,
  },
};
