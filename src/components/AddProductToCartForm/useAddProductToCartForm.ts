import { useState } from "react";
import { useForm } from "react-hook-form";
import { number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "../../types";

interface AddToCartFormData {
  amount: number;
}

export enum Status {
  Init = "Init",
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

export function useAddProductToCartForm(product: Product) {
  const [status, setStatus] = useState<Status>(Status.Init);

  const formSchema = object().shape({
    amount: number().required("").positive("").typeError(""),
  });

  const { register, handleSubmit, formState } = useForm<AddToCartFormData>({
    mode: "onTouched",
    defaultValues: {
      amount: 1,
    },
    // @ts-ignore
    resolver: yupResolver(formSchema),
  });

  const handleClick = () => {
    if (status === Status.Error || status === Status.Success) {
      setStatus(Status.Init);
    }
  };

  const submit = handleSubmit(({ amount }) => {
    setStatus(Status.Loading);
    // TODO: Заменить моки на настоящую функцию.
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      setStatus(Status.Success);
    });
  });

  return { status, register, formState, submit, handleClick };
}
