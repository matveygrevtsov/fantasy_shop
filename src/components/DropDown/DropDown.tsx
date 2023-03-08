import { PropsWithChildren } from "react";
import { useDropDown } from "./useDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./DropDown.module.css";

interface Props {
  title?: string;
  className?: string;
}

export function DropDown({
  title,
  className,
  children,
}: PropsWithChildren<Props>) {
  const { opened, handleClick } = useDropDown();

  const iconClassName = opened ? s.iconOpened : s.iconClosed;
  const headClassName = opened ? s.headOpened : s.headClosed;

  return (
    <div className={cn(s.root, className)}>
      <div onClick={handleClick} className={headClassName}>
        <span className={s.title}>{title}</span>
        <FontAwesomeIcon className={iconClassName} icon={faAngleDown} />
      </div>
      {opened && <div className={s.body}>{children}</div>}
    </div>
  );
}
