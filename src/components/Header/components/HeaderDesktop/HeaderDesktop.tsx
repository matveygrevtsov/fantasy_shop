import { NavLink } from "react-router-dom";
import { LogOut } from "../../../LogOut/LogOut";
import { Logo } from "../../../Logo/Logo";
import cn from "classnames";

import s from "./HeaderDesktop.module.css";

interface RouteInfo {
  path: string;
  title: string;
  showInNavBarForGuest: boolean;
  showInNavBarForLoggedIn: boolean;
}

interface Props {
  className?: string;
  isUserLoggedIn: boolean;
  routes: RouteInfo[];
}

export const HeaderDesktop: React.FC<Props> = ({
  className,
  isUserLoggedIn,
  routes,
}) => {
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
        {isUserLoggedIn && <LogOut className={s.logout} />}
      </ul>
    </header>
  );
};
