import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";
import { SearchProductsParams } from "../SearchProductsParams/SearchProductsParams";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <div>
      <SearchProductsInput />
      <SearchProductsParams className={s.searchProductsParams} />
    </div>
  );
};
