import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { constants } from "../../constants";
import { firebaseApi } from "../../firebaseApi";
import { store, UserStatus } from "../../store";

import s from "./Header.module.css";

export const Header = observer(() => {
  const isLoggedIn = store.getUserState().userStatus === UserStatus.LoggedIn;
  const routes = Object.values(constants.routes).filter(
    ({ enableForGuest, enableForLoggedIn }) =>
      isLoggedIn ? enableForLoggedIn : enableForGuest
  );

  return (
    <header className={s.root}>
      <ul className={s.list}>
        {routes.map(({ path, title }) => (
          <li key={path}>
            <NavLink
              className={({ isActive }) => (isActive ? s.linkActive : s.link)}
              to={path}
            >
              {title}
            </NavLink>
          </li>
        ))}
        {isLoggedIn && (
          <button onClick={() => firebaseApi.signOut()}>Logout</button>
        )}
      </ul>
    </header>
  );
});
