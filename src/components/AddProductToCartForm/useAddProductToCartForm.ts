import { useForm } from "react-hook-form";
import { number, object } from "yup";
import { texts } from "../../constants/texts";
import { yupResolver } from "@hookform/resolvers/yup";

export const useAddProductToCartForm = (onSubmit: (amount: number) => void) => {
  const { productInvalidAmount, productAmountLimit } = texts.ProductActions;

  const formSchema = object().shape({
    amount: number()
      .required(productInvalidAmount)
      .integer(productInvalidAmount)
      .positive(productInvalidAmount)
      .typeError(productAmountLimit),
  });

  const { register, handleSubmit, formState } = useForm<{
    amount: number;
  }>({
    mode: "onTouched",
    defaultValues: {
      amount: 1,
    },
    // @ts-ignore
    resolver: yupResolver(formSchema),
  });

  const submit = handleSubmit(({ amount }) => {
    onSubmit(amount);
  });

  return { register, handleSubmit: submit, formState };
};
