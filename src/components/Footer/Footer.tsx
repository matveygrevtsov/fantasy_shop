import cn from "classnames";
import { texts } from "../../constants/texts";

import s from "./Footer.module.css";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const { copyright } = texts.Footer;

  return <footer className={cn(s.root, className)}>{copyright}</footer>;
};
