import { observer } from "mobx-react-lite";
import { RouteName } from "../../constants/enums";
import { routes } from "../../constants/routes";
import { texts } from "../../constants/texts";
import { store, UserStatus } from "../../store";
import { HeaderDesktop } from "./components/HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "./components/HeaderMobile/HeaderMobile";

import s from "./Header.module.css";

export interface RouteConfig {
  title: string;
  path: string;
}

export const Header = observer(() => {
  const isUserLoggedIn =
    store.getUserState().userStatus === UserStatus.LoggedIn;
  const routes = getRoutes(isUserLoggedIn);

  return (
    <>
      <HeaderMobile
        routes={routes}
        isUserLoggedIn={isUserLoggedIn}
        className={s.headerMobile}
      />
      <HeaderDesktop
        routes={routes}
        isUserLoggedIn={isUserLoggedIn}
        className={s.headerDesktop}
      />
    </>
  );
});

function getRoutes(isUserLoggedIn: boolean): RouteConfig[] {
  const routesNames = Object.keys(RouteName) as RouteName[];
  const enabledRoutes = routesNames.filter((routeName) => {
    const { showInNavBarForGuest, showInNavBarForLoggedIn } = routes[routeName];
    return isUserLoggedIn ? showInNavBarForLoggedIn : showInNavBarForGuest;
  });
  return enabledRoutes.map((routeName) => ({
    title: texts.Header.routesTitles[routeName],
    path: routes[routeName].path,
  }));
}
