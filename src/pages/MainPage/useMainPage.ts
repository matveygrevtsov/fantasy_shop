import { useNavigate, useSearchParams } from "react-router-dom";
import { decodeBase64, encodeBase64 } from "../../utils/base64";
import { ProductCategory, ProductsSortType } from "../../constants/enums";
import { useEffect, useState } from "react";
import { Product, SearchProductsParams } from "../../types";
import { firebaseApi } from "../../firebaseApi";

export enum StateStatus {
  Loading = "Loading",
  Error = "Error",
  Success = "Success",
}

type State =
  | {
      status: StateStatus.Loading | StateStatus.Error;
    }
  | {
      status: StateStatus.Success;
      products: Product[];
    };

export function useMainPage() {
  const [state, setState] = useState<State>({
    status: StateStatus.Loading,
  });
  const navigate = useNavigate();
  const [searchParamsEncoded, setSearchParamsEncoded] = useSearchParams();

  function handleSubmit(searchProductsFormState: SearchProductsParams): void {
    console.log(searchProductsFormState);
    navigate(`?searchParamsEncoded=${encodeBase64(searchProductsFormState)}`);
  }

  useEffect(() => {
    setState({
      status: StateStatus.Loading,
    });
    mapSearchParamsEncodedToProducts(
      searchParamsEncoded.get("searchParamsEncoded") || ""
    ).then(
      (products) => {
        setState({
          status: StateStatus.Success,
          products,
        });
      },
      () => setState({ status: StateStatus.Error })
    );
  }, [searchParamsEncoded, setSearchParamsEncoded]);

  return { state, handleSubmit };
}

async function mapSearchParamsEncodedToProducts(
  searchParamsEncoded: string
): Promise<Product[]> {
  const searchParams = decodeBase64(searchParamsEncoded);
  return isSearchParams(searchParams)
    ? firebaseApi.getProductsBySearchParams(searchParams)
    : firebaseApi.getProductsBySearchParams();
}

function isSearchParams(obj: any): obj is SearchProductsParams {
  if (!obj || typeof obj !== "object") return false;
  if (typeof obj.searchString !== "string") return false;
  if (
    typeof obj.productCategories !== "object" ||
    !Array.isArray(obj.productCategories)
  ) {
    return false;
  }

  if (!Object.values(ProductsSortType).includes(obj.productsSortType)) {
    return false;
  }

  if (
    obj.productCategories.some(
      (category: any) => !Object.values(ProductCategory).includes(category)
    )
  ) {
    return false;
  }

  return true;
}
