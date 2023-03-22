import { observer } from "mobx-react-lite";
import { texts } from "../../constants/texts";
import { store } from "../../store";
import { RouteConfig } from "../../types/routing";
import { UserStatus, UserState, UserRole } from "../../types/user";
import { HeaderDesktop } from "./components/HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "./components/HeaderMobile/HeaderMobile";

import s from "./Header.module.css";

export const Header = observer(() => {
  const userState = store.getUserState();
  const routes = getRoutes(userState);
  const isUserAuthorized = userState.status === UserStatus.Authorized;

  return (
    <>
      <HeaderMobile
        routes={routes}
        displayLogOutButton={isUserAuthorized}
        className={s.headerMobile}
      />
      <HeaderDesktop
        routes={routes}
        displayLogOutButton={isUserAuthorized}
        className={s.headerDesktop}
      />
    </>
  );
});

function getRoutes(userState: UserState): RouteConfig[] {
  const { adminRoutes, clientRoutes, guestRoutes } = texts.Header;

  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role === UserRole.Admin
  ) {
    return adminRoutes;
  }

  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role === UserRole.Client
  ) {
    return clientRoutes;
  }

  return guestRoutes;
}
