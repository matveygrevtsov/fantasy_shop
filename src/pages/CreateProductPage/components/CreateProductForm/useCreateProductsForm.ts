import { useForm } from "react-hook-form";
import { array, object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { texts } from "../../../../constants/texts";
import { CreateProductFormValues } from "../../../../types/product";

export function useCreateProductsForm(
  onSubmit: (product: CreateProductFormValues) => void
) {
  const { validationErrors } = texts.CreateProductPage.CreateProductForm;

  const formSchema = object().shape({
    name: string().required(validationErrors.emptyName),
    description: string().required(validationErrors.emptyDescription),
    price: number()
      .required(validationErrors.emptyPrice)
      .positive(validationErrors.invalidPrice)
      .typeError(validationErrors.invalidPrice),
    amount: number()
      .required(validationErrors.emptyAmount)
      .positive(validationErrors.invalidAmount)
      .typeError(validationErrors.invalidAmount),
    productCategories: array(),
    images: array(),
  });

  const { register, handleSubmit, control, formState } =
    useForm<CreateProductFormValues>({
      mode: "onTouched",
      defaultValues: {
        name: "",
        description: "",
        price: 0,
        amount: 0,
        productCategories: [],
        images: [],
      },
      // @ts-ignore
      resolver: yupResolver(formSchema),
    });

  const submit = handleSubmit((product: CreateProductFormValues) =>
    onSubmit(product)
  );

  return { register, control, submit, formState };
}
