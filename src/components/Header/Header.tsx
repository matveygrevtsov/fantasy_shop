import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import { firebaseApi } from "../../firebaseApi";
import { store } from "../../store";

import s from "./Header.module.css";

export const Header = observer(() => {
  const isClient = store.isClient();
  const routes = Object.values(constants.routes).filter(
    ({ enableForGuest, enableForClient }) =>
      isClient ? enableForClient : enableForGuest
  );

  return (
    <header className={s.root}>
      <ul className={s.list}>
        {routes.map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
        {isClient && (
          <button onClick={() => firebaseApi.signOut()}>Logout</button>
        )}
      </ul>
    </header>
  );
});
