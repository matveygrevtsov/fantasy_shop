import { useState } from "react";
import { firebaseApi } from "../../firebaseApi/firebaseApi";
import { Product } from "../../types/product";
import { ClientData } from "../../types/user";

export enum Status {
  Init = "Init",
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

type State =
  | {
      status: Status.Init | Status.Loading | Status.Success;
    }
  | {
      status: Status.Error;
      errorMessage: string;
    };

export function useAddProductToCartAction(
  product: Product,
  clientData?: ClientData
) {
  const [state, setState] = useState<State>({
    status: Status.Init,
  });

  const handleClick = () => {
    const { status } = state;
    if (status === Status.Error || status === Status.Success) {
      setState({
        status: Status.Init,
      });
    }
  };

  const handleSubmit = (amount: number) => {
    if (!clientData) {
      alert(
        "Пожалуйста, авторизуйтесь, чтобы иметь возможность добавлять товары в корзину."
      );
      return;
    }
    setState({
      status: Status.Loading,
    });
    firebaseApi.userAuthController
      .addProductToCart(clientData, product.id, amount)
      .then(
        () => setState({ status: Status.Success }),
        (error) =>
          setState({ status: Status.Error, errorMessage: error.message })
      );
  };

  return { state, handleSubmit, handleClick };
}
