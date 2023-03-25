import { useEffect, useState } from "react";
import { firebaseApi } from "../../../../firebaseApi/firebaseApi";
import { Product } from "../../../../types/product";
import { Cart } from "../../../../types/user";

export enum Status {
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

type State =
  | {
      status: Status.Loading;
    }
  | {
      status: Status.Error;
      errorMessage: string;
    }
  | {
      status: Status.Success;
      products: Product[];
    };

export const useCartPageContent = (cart: Cart) => {
  const [state, setState] = useState<State>({
    status: Status.Loading,
  });

  const getProductsListInCart = (
    products: Array<Product | undefined>
  ): Product[] => {
    return products.reduce<Product[]>((accumulator, product) => {
      if (!product) return accumulator;
      return [
        ...accumulator,
        {
          ...product,
          amount: cart[product.id],
        },
      ];
    }, []);
  };

  useEffect(() => {
    firebaseApi.productsController.fetchProductsData(Object.keys(cart)).then(
      (products) => {
        setState({
          status: Status.Success,
          products: getProductsListInCart(products),
        });
      },
      (error) => {
        setState({
          status: Status.Error,
          errorMessage: error.errorMessage,
        });
      }
    );
  }, []);

  return { state };
};
