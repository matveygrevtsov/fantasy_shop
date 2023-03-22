import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { RoutePath } from "../../types/routing";
import cn from "classnames";

import s from "./Logo.module.css";

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link className={cn(s.root, className)} to={RoutePath.MainPage}>
      <FontAwesomeIcon color="white" icon={faDragon} />
      <span className={s.title}>FantasyShop</span>
    </Link>
  );
};
