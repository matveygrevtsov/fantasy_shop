import cn from "classnames";
import { useSelect } from "./useSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import s from "./Select.module.css";

interface Props<T> {
  options: Record<string, string>;
  title: string;
  onChange: (option?: T) => void;
  className?: string;
}

export function Select<T>({ options, title, onChange, className }: Props<T>) {
  const { state, handleSelect, handleOpenCloseClick } = useSelect<T>(onChange);
  const optionsListClassName = state.isOpened
    ? s.optionsListOpened
    : s.optionsListClosed;

  return (
    <div className={cn(s.root, className)}>
      <div onClick={handleOpenCloseClick} className={s.top}>
        {title}
        <FontAwesomeIcon
          className={s.openOptionsListIcon}
          icon={faChevronDown}
        />
      </div>
      <ul className={optionsListClassName}>
        {Object.entries(options).map(([key, value]) => {
          const option = key as unknown as T;
          return (
            <li key={key} onClick={() => handleSelect(option)}>
              <input
                className={s.checkbox}
                type="checkbox"
                checked={option === state.activeOption}
              />
              <span>{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
