import { firebaseApi } from "../../firebaseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./LogOut.module.css";

interface Props {
  className?: string;
}

export const LogOut: React.FC<Props> = ({ className }) => {
  return (
    <button
      className={cn(s.root, className)}
      onClick={() => firebaseApi.signOut()}
    >
      <FontAwesomeIcon color="white" icon={faSignOut} />
    </button>
  );
};
