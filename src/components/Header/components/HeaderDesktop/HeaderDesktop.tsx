import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { constants } from "../../../../constants";
import { LogOut } from "../../../LogOut/LogOut";
import { store, UserStatus } from "../../../../store";
import { Logo } from "../../../Logo/Logo";
import cn from "classnames";

import s from "./HeaderDesktop.module.css";

interface Props {
  className?: string;
}

export const HeaderDesktop: React.FC<Props> = observer(({ className }) => {
  const isLoggedIn = store.getUserState().userStatus === UserStatus.LoggedIn;
  const routes = Object.values(constants.routes).filter(
    ({ enableForGuest, enableForLoggedIn }) =>
      isLoggedIn ? enableForLoggedIn : enableForGuest
  );

  return (
    <header className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.li}>
          <Logo />
        </li>
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
        {isLoggedIn && <LogOut className={s.logout} />}
      </ul>
    </header>
  );
});
