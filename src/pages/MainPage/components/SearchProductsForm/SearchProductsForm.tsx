import { SearchProductsInput } from "../SearchProductsInput/SearchProductsInput";
import { SearchProductsParams } from "../SearchProductsParams/SearchProductsParams";
import { useSearchProductsForm } from "./useSearchProductsForm";
import { SearchProductsFormState } from "../../types";

import s from "./SearchProductsForm.module.css";

interface Props {
  onSubmit: (searchProductsFormState: SearchProductsFormState) => void;
  className?: string;
}

export function SearchProductsForm({ className, onSubmit }: Props) {
  const { handleSubmit, handleSearchStringChange, handleSearchParamsChange } =
    useSearchProductsForm(onSubmit);

  return (
    <div className={className}>
      <SearchProductsInput
        onSubmit={handleSubmit}
        onChange={handleSearchStringChange}
      />
      <SearchProductsParams
        onChange={handleSearchParamsChange}
        className={s.searchProductsParams}
      />
    </div>
  );
}
