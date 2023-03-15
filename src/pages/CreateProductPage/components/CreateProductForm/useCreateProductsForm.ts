import { useForm } from "react-hook-form";
import { array, object, string } from "yup";
import { Product } from "../../../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { texts } from "../../../../constants/texts";

export function useCreateProductsForm(onSubmit: (product: Product) => void) {
  const { validationErrors } = texts.CreateProductPage.CreateProductForm;

  const formSchema = object().shape({
    name: string().required(validationErrors.emptyName),
    description: string().required(validationErrors.emptyDescription),
    images: array(),
  });

  const { register, handleSubmit, control, formState } = useForm<Product>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
    // @ts-ignore
    resolver: yupResolver(formSchema),
  });

  const submit = handleSubmit((product: Product) => onSubmit(product));

  return { register, control, submit, formState };
}
