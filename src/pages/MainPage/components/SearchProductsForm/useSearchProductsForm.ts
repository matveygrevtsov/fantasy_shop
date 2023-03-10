import { useForm } from "react-hook-form";
import { SearchProductsParams } from "../../../../types";

export function useSearchProductsForm(
  onSubmit: (searchProductsFormState: SearchProductsParams) => void
) {
  const { register, handleSubmit, control } = useForm<SearchProductsParams>({
    mode: "onTouched",
  });
  const submit = handleSubmit(onSubmit);

  return { register, submit, control };
}
