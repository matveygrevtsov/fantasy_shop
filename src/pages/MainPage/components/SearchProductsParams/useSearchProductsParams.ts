import { MultiValue } from "react-select";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";
import { Props } from "./SearchProductsParams";

export function useSearchProductsParams({
  onProductCategorySelect,
  onProductsSortTypeSelect,
}: Props) {
  function handleProductCategorySelect(
    event: MultiValue<{ value: ProductCategory; label: string }>
  ) {
    const selectedProductCategories = event.map(({ value }) => value);
    onProductCategorySelect(selectedProductCategories);
  }

  function handleSortTypeSelect(event: { value: ProductsSortType } | null) {
    if (event) {
      onProductsSortTypeSelect(event.value);
    }
  }

  return { handleProductCategorySelect, handleSortTypeSelect };
}
