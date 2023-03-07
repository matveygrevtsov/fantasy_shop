import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchInput } from "./useSearchInput";
import cn from "classnames";

import s from "./SearchInput.module.css";

interface Props {
  onSubmit: (searchString: string) => void;
  className?: string;
}

export function SearchInput({ onSubmit, className }: Props) {
  const { ref, handleSubmit } = useSearchInput(onSubmit);

  return (
    <div className={cn(s.root, className)}>
      <input ref={ref} type="search" className={s.input} />
      <button onClick={handleSubmit} className={s.button}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
