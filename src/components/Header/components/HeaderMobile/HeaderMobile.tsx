import { Logo } from "../../../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { constants } from "../../../../constants";
import { useHeaderMobile } from "./useHeaderMobile";
import { observer } from "mobx-react-lite";
import { store, UserStatus } from "../../../../store";
import { NavLink } from "react-router-dom";
import { LogOut } from "../../../LogOut/LogOut";

import s from "./HeaderMobile.module.css";

interface Props {
  className?: string;
}

export const HeaderMobile: React.FC<Props> = observer(({ className }) => {
  const isLoggedIn = store.getUserState().userStatus === UserStatus.LoggedIn;
  const { isOpened, handleClick } = useHeaderMobile();
  const routes = Object.values(constants.routes).filter(
    ({ enableForGuest, enableForLoggedIn }) =>
      isLoggedIn ? enableForLoggedIn : enableForGuest
  );

  return (
    <div className={className}>
      <header className={s.root}>
        <div className={s.container}>
          <Logo />
          <button onClick={handleClick} className={s.openNavButton}>
            <FontAwesomeIcon color="white" icon={faBars} />
          </button>
        </div>
      </header>
      {isOpened && (
        <ul className={s.list}>
          {routes.map(({ path, title }) => (
            <li className={s.li} key={path}>
              <NavLink
                className={({ isActive }) => (isActive ? s.linkActive : s.link)}
                to={path}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className={s.li}>
            {isLoggedIn && <LogOut className={s.logout} />}
          </li>
        </ul>
      )}
    </div>
  );
});
