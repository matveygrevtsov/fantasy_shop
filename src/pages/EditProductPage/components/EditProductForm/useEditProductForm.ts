import { useForm } from "react-hook-form";
import { array, number, object, string } from "yup";
import { texts } from "../../../../constants/texts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product, CreateProductFormData } from "../../../../types/product";

export const useEditProductForm = (productDataToEdit: Product) => {
  const { validationErrors } = texts.EditProductPage.editProductForm;

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
