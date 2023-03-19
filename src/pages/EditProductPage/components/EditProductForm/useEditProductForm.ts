import { useForm } from "react-hook-form";
import { array, number, object, string } from "yup";
import { texts } from "../../../../constants/texts";
import { CreateProductFormData, Product } from "../../../../types";
import { yupResolver } from "@hookform/resolvers/yup";

export const useEditProductForm = (productDataToEdit: Product) => {
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
    useForm<CreateProductFormData>({
      mode: "onTouched",
      defaultValues: {
        ...productDataToEdit,
        images: [],
      },
      // @ts-ignore
      resolver: yupResolver(formSchema),
    });

  const submit = handleSubmit((data) => console.log(data));

  const handleStartTyping = () => console.log();

  return { register, submit, control, formState, handleStartTyping };
};
