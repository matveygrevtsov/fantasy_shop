import cn from "classnames";
import { constants } from "../../../../constants";

import s from "./Footer.module.css";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const { copyright } = constants.Footer;

  return <footer className={cn(s.root, className)}>{copyright}</footer>;
};
