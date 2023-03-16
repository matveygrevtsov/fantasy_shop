import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../firebaseApi";
import { Product } from "../../types";

export enum ProductPageStatus {
  Loading = "Loading",
  Error = "Error",
  NotFound = "NotFound",
  Success = "Success",
}

type State =
  | {
      status:
        | ProductPageStatus.Loading
        | ProductPageStatus.Error
        | ProductPageStatus.NotFound;
    }
  | {
      status: ProductPageStatus.Success;
      data: Product;
    };

export const useProductPage = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<State>({
    status: ProductPageStatus.Loading,
  });

  useEffect(() => {
    const productId = searchParams.get("id");
    if (!productId) {
      setState({
        status: ProductPageStatus.NotFound,
      });
      return;
    }
    firebaseApi.getProduct(productId).then(
      (data) => {
        if (!data) {
          setState({
            status: ProductPageStatus.NotFound,
          });
        } else {
          setState({
            status: ProductPageStatus.Success,
            data,
          });
        }
      },
      (error) => {
        setState({
          status: ProductPageStatus.Error,
        });
      }
    );
  }, [searchParams]);

  return { state };
};
