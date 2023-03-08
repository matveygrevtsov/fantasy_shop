import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../../../constants/texts";

import s from "./SearchProductsInput.module.css";

interface Props {
  className?: string;
}

export function SearchProductsInput({ className }: Props) {
  return (
    <div className={cn(s.root, className)}>
      <input
        placeholder={texts.ProductsSearchForm.searchProductPlaceholder}
        className={s.input}
      />
      <button className={s.button}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
