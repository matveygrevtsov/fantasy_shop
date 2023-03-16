import { useForm } from "react-hook-form";
import { array, object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { texts } from "../../../../constants/texts";
import { CreateProductFormData } from "../../../../types";

export function useCreateProductsForm(
  onSubmit: (product: CreateProductFormData) => void
) {
  const { validationErrors } = texts.CreateProductPage.CreateProductForm;

  const formSchema = object().shape({
    name: string().required(validationErrors.emptyName),
    description: string().required(validationErrors.emptyDescription),
    price: number()
      .required(validationErrors.emptyPrice)
      .positive(validationErrors.invalidPrice)
      .typeError(validationErrors.invalidPrice),
    images: array(),
  });

  const { register, handleSubmit, control, formState } =
    useForm<CreateProductFormData>({
      mode: "onTouched",
      defaultValues: {
        name: "",
        description: "",
        images: [],
      },
      // @ts-ignore
      resolver: yupResolver(formSchema),
    });

  const submit = handleSubmit((product: CreateProductFormData) =>
    onSubmit(product)
  );

  return { register, control, submit, formState };
}
