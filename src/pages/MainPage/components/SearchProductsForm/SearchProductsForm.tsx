import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";
import { SearchProductsParams } from "../SearchProductsParams/SearchProductsParams";
import { useSearchProductsForm } from "./useSearchProductsForm";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";

import s from "./SearchProductsForm.module.css";

export interface SearchParams {
  productCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}

export interface SearchProductsFormState {
  searchString: string;
  searchParams: SearchParams;
}

interface Props {
  onSubmit: (searchProductsFormState: SearchProductsFormState) => void;
  className?: string;
}

export function SearchProductsForm({ className, onSubmit }: Props) {
  const { handleSubmit, handleSearchStringChange, handleSearchParamsChange } =
    useSearchProductsForm(onSubmit);

  return (
    <div className={className}>
      <SearchProductsInput
        onSubmit={handleSubmit}
        onChange={handleSearchStringChange}
      />
      <SearchProductsParams
        onChange={handleSearchParamsChange}
        className={s.searchProductsParams}
      />
    </div>
  );
}
