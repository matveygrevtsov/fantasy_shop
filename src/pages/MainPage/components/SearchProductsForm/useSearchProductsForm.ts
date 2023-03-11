import { useForm } from "react-hook-form";
import { ProductsSortType } from "../../../../constants/enums";
import { SearchProductsParams } from "../../../../types";

export function useSearchProductsForm(
  onSubmit: (searchProductsFormState: SearchProductsParams) => void
) {
  const { register, handleSubmit, control } = useForm<SearchProductsParams>({
    mode: "onTouched",
    defaultValues: {
      searchString: "",
      productsCategories: [],
      productsSortType: ProductsSortType.DescendingOrderPrice,
    },
  });
  const submit = handleSubmit(onSubmit);

  return { register, submit, control };
}
