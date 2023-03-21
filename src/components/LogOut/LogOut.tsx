import { firebaseApi } from "../../firebaseApi/firebaseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./LogOut.module.css";

interface Props {
  className?: string;
  text?: string;
}

export const LogOut: React.FC<Props> = ({ className, text }) => {
  return (
    <button
      className={cn(s.root, className)}
      onClick={() => firebaseApi.userAuthController.signOut()}
    >
      <span className={s.text}>{text}</span>
      <FontAwesomeIcon color="white" icon={faSignOut} />
    </button>
  );
};
