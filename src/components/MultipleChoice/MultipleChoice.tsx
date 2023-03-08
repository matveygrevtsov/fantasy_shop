import cn from "classnames";
import { useMultipleChoice } from "./useMultipleChoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import s from "./MultipleChoice.module.css";

interface Props<T> {
  title: string;
  options: Record<string, string>;
  onSelect: (options: T[]) => void;
  rootClassName?: string;
  optionsListClassName?: string;
}

export function MultipleChoice<T>({
  title,
  options,
  onSelect,
  rootClassName,
  optionsListClassName,
}: Props<T>) {
  const { ref, state, handleSelect, handleOpenClick } =
    useMultipleChoice<T>(onSelect);

  const classNameHead = state.isOpened ? s.headOpened : s.headClosed;

  const classNameOptionsList = state.isOpened
    ? cn(s.optionsListOpened, optionsListClassName)
    : cn(s.optionsListClosed, optionsListClassName);

  return (
    <div className={cn(s.root, rootClassName)}>
      <div onClick={handleOpenClick} className={classNameHead}>
        {title}
        <FontAwesomeIcon
          className={s.openOptionsListIcon}
          icon={faChevronDown}
        />
      </div>
      <ul ref={ref} className={classNameOptionsList}>
        {Object.entries(options).map(([key, value]) => {
          const option = key as unknown as T;

          return (
            <li
              className={s.option}
              key={key}
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                checked={state.selectedOptions.includes(option)}
                className={s.checkbox}
              />
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
