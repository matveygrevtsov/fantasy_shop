import { Logo } from "../../../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useHeaderMobile } from "./useHeaderMobile";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { LogOut } from "../../../LogOut/LogOut";
import { RouteConfig } from "../../Header";
import { texts } from "../../../../constants/texts";

import s from "./HeaderMobile.module.css";

interface Props {
  routes: RouteConfig[];
  isUserLoggedIn: boolean;
  className?: string;
}

export const HeaderMobile: React.FC<Props> = observer(
  ({ className, routes, isUserLoggedIn }) => {
    const { isOpened, handleClick } = useHeaderMobile();
    const { logoutText } = texts.Header;

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
                  className={({ isActive }) =>
                    isActive ? s.linkActive : s.link
                  }
                  to={path}
                >
                  {title}
                </NavLink>
              </li>
            ))}
            {isUserLoggedIn && (
              <li className={s.li}>
                <LogOut className={s.logout} text={logoutText} />
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
);
