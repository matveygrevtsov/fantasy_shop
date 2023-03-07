import { SearchInput } from "../SearchInput/SearchInput";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <div className={s.root}>
      <SearchInput onSubmit={(searchString) => alert(searchString)} />
    </div>
  );
};
