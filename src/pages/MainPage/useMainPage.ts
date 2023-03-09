import { SearchProductsFormState } from "./types";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useMainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(
    searchProductsFormState: SearchProductsFormState
  ): void {
    console.log(searchProductsFormState);
  }

  return { handleSubmit };
}
