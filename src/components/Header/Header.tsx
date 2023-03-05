import { observer } from "mobx-react-lite";
import { constants } from "../../constants";
import { store, UserStatus } from "../../store";
import { HeaderDesktop } from "./components/HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "./components/HeaderMobile/HeaderMobile";

import s from "./Header.module.css";

export const Header = observer(() => {
  const isUserLoggedIn =
    store.getUserState().userStatus === UserStatus.LoggedIn;
  const routes = Object.values(constants.routes).filter(
    ({ showInNavBarForGuest, showInNavBarForLoggedIn }) =>
      isUserLoggedIn ? showInNavBarForLoggedIn : showInNavBarForGuest
  );

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
