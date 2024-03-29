import { useState } from "react";
import { firebaseApi } from "../../../../firebaseApi/firebaseApi";
import { CreateProductFormValues } from "../../../../types/product";

export enum Status {
  WaitingForUserInput = "WaitingForUserInput",
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

type State =
  | {
      status: Status.WaitingForUserInput | Status.Loading | Status.Success;
    }
  | {
      status: Status.Error;
      errorCode: string;
    };

export function useCreateProductPageContent() {
  const [state, setState] = useState<State>({
    status: Status.WaitingForUserInput,
  });

  const handleSubmit = (product: CreateProductFormValues) => {
    setState({
      status: Status.Loading,
    });
    firebaseApi.productsController.createProduct(product).then(
      () =>
        setState({
          status: Status.Success,
        }),
      (error) =>
        setState({
          status: Status.Error,
          errorCode: error.code,
        })
    );
  };

  const handleStartTyping = () => {
    if (state.status === Status.Error || state.status === Status.Success) {
      setState({
        status: Status.WaitingForUserInput,
      });
    }
  };

  return { handleSubmit, state, handleStartTyping };
}
