import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../../../constants/texts";

import s from "./SearchProductsInput.module.css";

interface Props {
  onSubmit: () => void;
  onChange: (searchString: string) => void;
  className?: string;
}

export function SearchProductsInput({ onSubmit, onChange, className }: Props) {
  return (
    <div className={cn(s.root, className)}>
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder={texts.ProductsSearchForm.searchProductPlaceholder}
        className={s.input}
        type="search"
      />
      <button onClick={onSubmit} className={s.button}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
