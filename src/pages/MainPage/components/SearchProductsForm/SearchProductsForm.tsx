import { useSearchProductsForm } from "./useSearchProductsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { texts } from "../../../../constants/texts";
import { SearchProductsParams } from "../../../../types";
import { Controller } from "react-hook-form";
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
            <Controller
              name="productsCategories"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  ref={ref}
                  value={texts.ProductsSearchForm.ProductCategorySelect.options.filter(
                    (option) => value.includes(option.value)
                  )}
                  onChange={(options) =>
                    onChange(options.map((option) => option.value))
                  }
                  options={
                    texts.ProductsSearchForm.ProductCategorySelect.options
                  }
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
              defaultValue={
                texts.ProductsSearchForm.ProductSortTypeSelect.options[0].value
              }
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={
                    texts.ProductsSearchForm.ProductSortTypeSelect.options
                  }
                  value={texts.ProductsSearchForm.ProductSortTypeSelect.options.find(
                    (option) => option.value === value
                  )}
                  onChange={(option) => onChange(option?.value)}
                  ref={ref}
                />
              )}
            />
          </li>
        </ul>
      </DropDown>
    </form>
  );
}
