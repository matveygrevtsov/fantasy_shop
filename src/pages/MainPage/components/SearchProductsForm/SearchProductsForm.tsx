import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";
import { SearchProductsParams } from "../SearchProductsParams/SearchProductsParams";

import s from "./SearchProductsForm.module.css";

interface Props {
  className?: string;
}

export function SearchProductsForm({ className }: Props) {
  return (
    <div className={className}>
      <SearchProductsInput />
      <SearchProductsParams
        onProductsSortTypeSelect={console.log}
        onProductCategorySelect={console.log}
        className={s.searchProductsParams}
      />
    </div>
  );
}
