import { observer } from "mobx-react-lite";
import { UserStatus } from "../../constants/enums";
import { texts } from "../../constants/texts";
import { store } from "../../store";
import { HeaderDesktop } from "./components/HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "./components/HeaderMobile/HeaderMobile";

import s from "./Header.module.css";

export interface RouteConfig {
  title: string;
  path: string;
}

export const Header = observer(() => {
  const userStatus = store.getUserState().status;
  const routes = getRoutes(userStatus);

  return (
    <>
      <HeaderMobile
        routes={routes}
        isUserLoggedIn={store.isUserLoggedIn()}
        className={s.headerMobile}
      />
      <HeaderDesktop
        routes={routes}
        isUserLoggedIn={store.isUserLoggedIn()}
        className={s.headerDesktop}
      />
    </>
  );
});

function getRoutes(userStatus: UserStatus): RouteConfig[] {
  if (userStatus === UserStatus.Loading) return [];
  const availableRoutes: RouteConfig[] = texts.Header.navigation.filter(
    ({ availableFor }) => availableFor[userStatus]
  );
  return availableRoutes;
}
