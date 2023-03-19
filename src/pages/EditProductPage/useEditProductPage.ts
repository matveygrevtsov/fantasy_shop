import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../firebaseApi";
import { Product } from "../../types";

export enum EditProductPageStatus {
  Loading = "Loading",
  Error = "Error",
  NotFound = "NotFound",
  Success = "Success",
}

type State =
  | {
      status:
        | EditProductPageStatus.Loading
        | EditProductPageStatus.Error
        | EditProductPageStatus.NotFound;
    }
  | {
      status: EditProductPageStatus.Success;
      productDataToEdit: Product;
    };

export const useEditProductPage = () => {
  const [state, setState] = useState<State>({
    status: EditProductPageStatus.Loading,
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get("id");
    if (!productId) {
      setState({
        status: EditProductPageStatus.NotFound,
      });
      return;
    }
    firebaseApi.getProduct(productId).then(
      (productDataToEdit) => {
        if (!productDataToEdit) {
          setState({
            status: EditProductPageStatus.NotFound,
          });
        } else {
          setState({
            status: EditProductPageStatus.Success,
            productDataToEdit,
          });
        }
      },
      (error) => {
        setState({
          status: EditProductPageStatus.Error,
        });
      }
    );
  }, []);

  return { state };
};
