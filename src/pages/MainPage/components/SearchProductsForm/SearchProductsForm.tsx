import { Select } from "../../../../components/Select/Select";
import { texts } from "../../../../constants/texts";
import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <div className={s.root}>
      <SearchProductsInput className={s.searchInput} />
      <ul className={s.searchParams}>
        <li>
          <Select
            {...texts.ProductCategorySelect}
            onSelect={(options) => alert(options)}
            selectType={"MultipleChoice"}
          />
        </li>
      </ul>
    </div>
  );
};
