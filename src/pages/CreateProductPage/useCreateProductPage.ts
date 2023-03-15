import { useState } from "react";
import { firebaseApi } from "../../firebaseApi";
import { Product } from "../../types";

export enum CreateProductPageStatus {
  WaitingForUserInput = "WaitingForUserInput",
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

type CreateProductPageState =
  | {
      status:
        | CreateProductPageStatus.WaitingForUserInput
        | CreateProductPageStatus.Loading
        | CreateProductPageStatus.Success;
    }
  | {
      status: CreateProductPageStatus.Error;
      errorCode: string;
    };

export function useCreateProductPage() {
  const [state, setState] = useState<CreateProductPageState>({
    status: CreateProductPageStatus.WaitingForUserInput,
  });

  const handleSubmit = (product: Product) => {
    setState({
      status: CreateProductPageStatus.Loading,
    });
    firebaseApi.createProduct(product).then(
      () =>
        setState({
          status: CreateProductPageStatus.Success,
        }),
      (error) =>
        setState({
          status: CreateProductPageStatus.Error,
          errorCode: error.code,
        })
    );
  };

  const handleStartTyping = () => {
    if (
      state.status === CreateProductPageStatus.Error ||
      state.status === CreateProductPageStatus.Success
    ) {
      setState({
        status: CreateProductPageStatus.WaitingForUserInput,
      });
    }
  };

  return { handleSubmit, state, handleStartTyping };
}
