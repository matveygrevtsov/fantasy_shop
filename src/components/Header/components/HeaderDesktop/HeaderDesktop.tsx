import { NavLink } from "react-router-dom";
import { LogOut } from "../../../LogOut/LogOut";
import { Logo } from "../../../Logo/Logo";
import { RouteConfig } from "../../../../types/routing";
import cn from "classnames";

import s from "./HeaderDesktop.module.css";

interface Props {
  className?: string;
  displayLogOutButton: boolean;
  routes: RouteConfig[];
}

export const HeaderDesktop: React.FC<Props> = ({
  className,
  displayLogOutButton,
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
        {displayLogOutButton && <LogOut className={s.logout} />}
      </ul>
    </header>
  );
};
