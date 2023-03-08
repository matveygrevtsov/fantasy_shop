import { MultipleChoice } from "../../../../components/MultipleChoice/MultipleChoice";
import { texts } from "../../../../constants/texts";
import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <div className={s.root}>
      <SearchProductsInput className={s.searchInput} />
      <ul className={s.searchParams}>
        <li>
          <MultipleChoice
            {...texts.ProductCategorySelect}
            onSelect={(options) => alert(options)}
          />
        </li>
      </ul>
    </div>
  );
};
