import cn from "classnames";
import { Logo } from "../../../Logo/Logo";

import s from "./Footer.module.css";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn(s.root, className)}>
      <div className={s.container}>
        <Logo />
      </div>
    </footer>
  );
};
