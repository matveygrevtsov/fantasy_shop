import cn from "classnames";
import { useSelect } from "./useSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import s from "./Select.module.css";

export type Props<T> =
  | {
      selectType: "MultipleChoice";
      onSelect: (options: T[]) => void;
      title: string;
      options: Record<string, string>;
      rootClassName?: string;
      optionsListClassName?: string;
    }
  | {
      selectType: "OneChoice";
      onSelect: (option: T | undefined) => void;
      title: string;
      options: Record<string, string>;
      rootClassName?: string;
      optionsListClassName?: string;
    };

export function Select<T>(props: Props<T>) {
  const { ref, state, handleSelect, handleOpenClick } = useSelect<T>(props);

  const classNameHead = state.isOpened ? s.headOpened : s.headClosed;

  const classNameOptionsList = state.isOpened
    ? cn(s.optionsListOpened, props.optionsListClassName)
    : cn(s.optionsListClosed, props.optionsListClassName);

  const openOptionsListIconClassName = state.isOpened
    ? s.openOptionsListIconOpened
    : s.openOptionsListIconClosed;

  return (
    <div className={cn(s.root, props.rootClassName)}>
      <div onClick={handleOpenClick} className={classNameHead}>
        <span className={s.title}>{props.title}</span>
        <FontAwesomeIcon
          className={openOptionsListIconClassName}
          icon={faChevronDown}
        />
      </div>
      <ul ref={ref} className={classNameOptionsList}>
        {Object.entries(props.options).map(([key, value]) => {
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
