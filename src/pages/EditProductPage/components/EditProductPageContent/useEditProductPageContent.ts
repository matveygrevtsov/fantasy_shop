import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../../../firebaseApi/firebaseApi";
import { Product } from "../../../../types";

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
      productDataToEdit: Product;
    };

export const useEditProductPageContent = () => {
  const [state, setState] = useState<State>({
    status: Status.Loading,
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setState({
      status: Status.Loading,
    });
    const productId = searchParams.get("id");
    if (!productId) {
      setState({
        status: Status.NotFound,
      });
      return;
    }
    firebaseApi.productsController.fetchProductData(productId).then(
      (productDataToEdit) => {
        if (!productDataToEdit) {
          setState({
            status: Status.NotFound,
          });
        } else {
          setState({
            status: Status.Success,
            productDataToEdit,
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
