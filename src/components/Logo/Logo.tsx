import { Link } from "react-router-dom";
import { constants } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./Logo.module.css";

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link className={cn(s.root, className)} to={constants.routes.MainPage.path}>
      <FontAwesomeIcon color="white" icon={faDragon} />
      <span className={s.title}>FantasyShop</span>
    </Link>
  );
};
