import cn from "classnames";

import s from "./Preloader.module.css";

interface Props {
  className?: string;
}

export const Preloader: React.FC<Props> = ({ className }) => {
  return <div className={cn(s.root, className)} />;
};
