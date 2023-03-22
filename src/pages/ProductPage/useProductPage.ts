import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../firebaseApi/firebaseApi";
import { Product } from "../../types/product";

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
      product: Product;
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
    firebaseApi.productsController.fetchProductData(productId).then(
      (product) => {
        if (!product) {
          setState({
            status: Status.NotFound,
          });
        } else {
          setState({
            status: Status.Success,
            product,
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
