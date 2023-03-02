import { Link } from "react-router-dom";
import { routes } from "../../constants";

import s from './Header.module.css';

export const Header = () => {
  const headerRoutes = Object.values(routes);

  return (
    <header className={s.root}>
      <ul className={s.routesList}>
        {headerRoutes.map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
