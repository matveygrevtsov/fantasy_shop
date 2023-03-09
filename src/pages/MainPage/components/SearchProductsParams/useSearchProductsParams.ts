import { useState } from "react";
import { MultiValue } from "react-select";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";
import { SearchParams } from "../SearchProductsForm/useSearchProductsForm";
import { Props } from "./SearchProductsParams";

export function useSearchProductsParams({ onChange }: Props) {
  const [state, setState] = useState<SearchParams>({
    productCategories: [],
    productsSortType:
      texts.ProductsSearchForm.ProductSortTypeSelect.defaultOption.value,
  });

  function handleProductCategorySelect(
    event: MultiValue<{ value: ProductCategory; label: string }>
  ) {
    const productCategories = event.map(({ value }) => value);
    const newState = { ...state, productCategories };
    onChange(newState);
    setState(newState);
  }

  function handleSortTypeSelect(event: { value: ProductsSortType } | null) {
    if (event) {
      const productsSortType = event.value;
      const newState = { ...state, productsSortType };
      onChange(newState);
      setState(newState);
    }
  }

  return { handleProductCategorySelect, handleSortTypeSelect };
}
