import { SearchProductsFormState } from "./types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decodeBase64, encodeBase64 } from "../../utils/base64";
import { ProductCategory, ProductsSortType } from "../../constants/enums";
import { useEffect, useState } from "react";
import { Product } from "../../types";

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
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(
    searchProductsFormState: SearchProductsFormState
  ): void {
    navigate(`?searchParams=${encodeBase64(searchProductsFormState)}`);
  }

  useEffect(() => {
    setState({
      status: StateStatus.Loading,
    });
    mapSearchParamsToProducts(searchParams.get("searchParams") || "").then(
      (products) => {
        setState({
          status: StateStatus.Success,
          products,
        });
      },
      () => setState({ status: StateStatus.Error })
    );
  }, [searchParams, mapSearchParamsToProducts, setSearchParams]);

  return { state, handleSubmit };
}

async function mapSearchParamsToProducts(
  searchParams: string
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [];
}

function isSearchProductsFormState(obj: any): obj is SearchProductsFormState {
  if (!obj || typeof obj !== "object") return false;
  if (typeof obj.searchString !== "string") return false;
  if (!obj.searchParams || typeof obj.searchParams !== "object") return false;
  if (
    typeof obj.searchParams.productCategories !== "object" ||
    !Array.isArray(obj.searchParams.productCategories)
  ) {
    return false;
  }

  if (
    !Object.values(ProductsSortType).includes(obj.searchParams.productsSortType)
  ) {
    return false;
  }

  if (
    obj.searchParams.productCategories.some(
      (category: any) => !Object.values(ProductCategory).includes(category)
    )
  ) {
    return false;
  }

  return true;
}
