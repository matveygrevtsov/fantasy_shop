import { useState } from "react";
import { firebaseApi } from "../../firebaseApi/firebaseApi";
import { Product } from "../../types/product";
import { ClientData } from "../../types/user";

export enum Status {
  Init = "Init",
  Loading = "Loading",
  Error = "Error",
  PartialSuccess = "PartialSuccess",
  Success = "Success",
  SoldOut = "SoldOut",
}

type State =
  | {
      status: Status.Init | Status.Loading | Status.Success | Status.SoldOut;
    }
  | {
      status: Status.Error;
      errorMessage: string;
    }
  | {
      status: Status.PartialSuccess;
      realAmount: number;
    };

export function useAddProductToCart(product: Product, clientData?: ClientData) {
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

  const handleSubmit = async (expectedAmount: number) => {
    if (!clientData) {
      alert(
        "Пожалуйста, авторизуйтесь, чтобы иметь возможность добавлять товары в корзину."
      );
      return;
    }
    setState({
      status: Status.Loading,
    });
    try {
      const realAmount = await firebaseApi.userAuthController.addProductToCart(
        clientData,
        product.id,
        expectedAmount
      );
      if (realAmount === 0) {
        setState({
          status: Status.SoldOut,
        });
        return;
      }
      if (realAmount < expectedAmount) {
        setState({
          status: Status.PartialSuccess,
          realAmount,
        });
        return;
      }
      setState({
        status: Status.Success,
      });
    } catch (error: any) {
      setState({ status: Status.Error, errorMessage: error.message });
    }
  };

  return { state, handleSubmit, handleClick };
}
