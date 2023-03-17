import { useState } from "react";
import { useForm } from "react-hook-form";
import { number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddToCartFormData {
  amount: number;
}

export enum AddToCartFormStatus {
  Init = "Init",
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

export function useAddToCartForm(onSubmit: (amount: number) => Promise<void>) {
  const [state, setState] = useState<AddToCartFormStatus>(
    AddToCartFormStatus.Init
  );

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
    if (
      state === AddToCartFormStatus.Error ||
      state === AddToCartFormStatus.Success
    ) {
      setState(AddToCartFormStatus.Init);
    }
  };

  const submit = handleSubmit(({ amount }) => {
    setState(AddToCartFormStatus.Loading);
    onSubmit(amount).then(
      () => {
        setState(AddToCartFormStatus.Success);
      },
      () => {
        setState(AddToCartFormStatus.Error);
      }
    );
  });

  return { state, register, formState, submit, handleClick };
}
