import { useSearchProductsForm } from "./useSearchProductsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { texts } from "../../../../constants/texts";
import { Controller } from "react-hook-form";
import { SearchProductsParams } from "../../../../types/product";
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
              {texts.ProductCategorySelect.title}
            </label>
            <Controller
              name="productsCategories"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  onChange={(selectedOptions) =>
                    onChange(selectedOptions.map(({ value }) => value))
                  }
                  options={texts.ProductCategorySelect.options}
                  isMulti
                />
              )}
            />
          </li>
          <li className={s.searchParam}>
            <label className={s.label}>
              {texts.ProductsSearchForm.ProductSortTypeSelect.title}
            </label>
            <Controller
              name="productsSortType"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  options={
                    texts.ProductsSearchForm.ProductSortTypeSelect.options
                  }
                  onChange={onChange}
                />
              )}
            />
          </li>
        </ul>
      </DropDown>
    </form>
  );
}
