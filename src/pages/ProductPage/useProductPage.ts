import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../firebaseApi";
import { Product } from "../../types";

export enum Status {
  Loading = "Loading",
  Error = "Error",
  NotFound = "NotFound",
  Success = "Success",
}

type State =
  | {
      status: Status.Loading | Status.Error | Status.NotFound;
    }
  | {
      status: Status.Success;
      data: Product;
    };

export const useProductPage = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<State>({
    status: Status.Loading,
  });

  useEffect(() => {
    const productId = searchParams.get("id");
    if (!productId) {
      setState({
        status: Status.NotFound,
      });
      return;
    }
    firebaseApi.getProduct(productId).then(
      (data) => {
        if (!data) {
          setState({
            status: Status.NotFound,
          });
        } else {
          setState({
            status: Status.Success,
            data,
          });
        }
      },
      (error) => {
        setState({
          status: Status.Error,
        });
      }
    );
  }, [searchParams]);

  return { state };
};
