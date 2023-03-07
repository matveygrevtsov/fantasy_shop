import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <div className={s.root}>
      <SearchProductsInput className={s.searchInput} />
    </div>
  );
};
