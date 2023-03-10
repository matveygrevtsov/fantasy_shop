import { useSearchProductsForm } from "./useSearchProductsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { texts } from "../../../../constants/texts";
import { SearchProductsParams } from "../../../../types";
import Select from "react-select";

import s from "./SearchProductsForm.module.css";

interface Props {
  onSubmit: (searchProductsFormState: SearchProductsParams) => void;
  className?: string;
}

export function SearchProductsForm({ className, onSubmit }: Props) {
  const { register, submit, control } = useSearchProductsForm(onSubmit);

  return (
    <form onSubmit={submit} className={className}>
      <div className={s.searchInputContainer}>
        <input
          {...register("searchString")}
          placeholder={texts.ProductsSearchForm.searchInputPlaceholder}
          className={s.searchInput}
          type="search"
        />
        <button className={s.submitButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <DropDown
        className={s.searchParams}
        title={texts.ProductsSearchForm.searchProductsParamsTitle}
      >
        <ul className={s.searchParams}>
          <li className={s.searchParam}>
            <label className={s.label}>
              {texts.ProductsSearchForm.ProductCategorySelect.title}
            </label>
            <Select
              // {...register("productsCategories")}
              placeholder={texts.ProductsSearchForm.ProductCategorySelect.title}
              isMulti={true}
              options={texts.ProductsSearchForm.ProductCategorySelect.options}
            />
          </li>
          <li className={s.searchParam}>
            <label className={s.label}>
              {texts.ProductsSearchForm.ProductSortTypeSelect.title}
            </label>
            <Select
              // {...register("productsSortType")}
              defaultValue={
                texts.ProductsSearchForm.ProductSortTypeSelect.defaultOption
              }
              options={[
                texts.ProductsSearchForm.ProductSortTypeSelect.defaultOption,
                ...texts.ProductsSearchForm.ProductSortTypeSelect.options,
              ]}
            />
          </li>
        </ul>
      </DropDown>
    </form>
  );
}
