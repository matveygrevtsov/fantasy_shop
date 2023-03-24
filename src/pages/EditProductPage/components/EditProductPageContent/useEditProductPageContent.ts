import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firebaseApi } from "../../../../firebaseApi/firebaseApi";
import { EditProductFormValues, Product } from "../../../../types/product";

export enum Status {
  Loading = "Loading",
  Error = "Error",
  NotFound = "NotFound",
  ProductDataLoadedSuccessfully = "ProductDataLoadedSuccessfully",
  SavingChangesSuccess = "SavingChangesSuccess",
  SavingChangesError = "SavingChangesError",
}

type State =
  | {
      status: Status.Loading | Status.NotFound;
    }
  | {
      status: Status.ProductDataLoadedSuccessfully;
      productDataToEdit: Product;
    }
  | {
      status: Status.Error | Status.SavingChangesError;
      errorMessage: string;
    }
  | {
      status: Status.SavingChangesSuccess;
      newProductData: EditProductFormValues;
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
            status: Status.ProductDataLoadedSuccessfully,
            productDataToEdit,
          });
        }
      },
      (error) => {
        setState({
          status: Status.Error,
          errorMessage: error.message,
        });
      }
    );
  }, [searchParams]);

  const handleSubmit = (editProductFormValues: EditProductFormValues) => {
    setState({
      status: Status.Loading,
    });
    firebaseApi.productsController.editProduct(editProductFormValues).then(
      () => {
        setState({
          status: Status.SavingChangesSuccess,
          newProductData: editProductFormValues,
        });
      },
      (error) => {
        setState({
          status: Status.SavingChangesError,
          errorMessage: error.message,
        });
      }
    );
  };

  return { state, handleSubmit };
};
