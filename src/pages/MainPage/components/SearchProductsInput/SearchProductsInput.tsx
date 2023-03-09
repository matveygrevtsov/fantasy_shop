import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../../../constants/texts";
import { useSearchInput } from "./useSearchInput";

import s from "./SearchProductsInput.module.css";

interface Props {
  onSubmit: () => void;
  onChange: (searchString: string) => void;
  className?: string;
}

export function SearchProductsInput({ onSubmit, onChange, className }: Props) {
  const { refInput, refButton } = useSearchInput();

  return (
    <div className={cn(s.root, className)}>
      <input
        ref={refInput}
        onChange={(event) => onChange(event.target.value)}
        placeholder={texts.ProductsSearchForm.searchProductPlaceholder}
        className={s.input}
        type="search"
      />
      <button ref={refButton} onClick={onSubmit} className={s.button}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
