import { useState } from "react";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";
import { SearchProductsFormState } from "./SearchProductsForm";

export interface SearchParams {
  productCategories: ProductCategory[];
  productsSortType: ProductsSortType;
}

interface State {
  searchString: string;
  searchParams: SearchParams;
}

export const initSearchProductsFormState: State = {
  searchString: "",
  searchParams: {
    productCategories: [],
    productsSortType:
      texts.ProductsSearchForm.ProductSortTypeSelect.defaultOption.value,
  },
};

export function useSearchProductsForm(
  onSubmit: (searchProductsFormState: SearchProductsFormState) => void
) {
  const [state, setState] = useState<State>(initSearchProductsFormState);
  const handleSearchStringChange = (searchString: string) =>
    setState((prevState) => ({ ...prevState, searchString }));
  const handleSearchParamsChange = (searchParams: SearchParams) =>
    setState((prevState) => ({ ...prevState, searchParams }));
  const handleSubmit = () => onSubmit(state);

  return { handleSubmit, handleSearchStringChange, handleSearchParamsChange };
}
