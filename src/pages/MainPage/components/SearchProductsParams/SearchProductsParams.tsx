import cn from "classnames";
import Select from "react-select";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { texts } from "../../../../constants/texts";
import { useSearchProductsParams } from "./useSearchProductsParams";
import { SearchParams } from "../SearchProductsForm/useSearchProductsForm";

import s from "./SearchProductsParams.module.css";

export interface Props {
  onChange: (searchParams: SearchParams) => void;
  className?: string;
}

export function SearchProductsParams(props: Props) {
  const {
    searchProductsParamsTitle,
    ProductCategorySelect,
    ProductSortTypeSelect,
  } = texts.ProductsSearchForm;
  const { handleProductCategorySelect, handleSortTypeSelect } =
    useSearchProductsParams(props);

  return (
    <DropDown
      className={cn(s.root, props.className)}
      title={searchProductsParamsTitle}
    >
      <ul className={s.searchParams}>
        <li className={s.searchParam}>
          <label className={s.label}>{ProductCategorySelect.title}</label>
          <Select
            placeholder={ProductCategorySelect.placeholder}
            onChange={handleProductCategorySelect}
            isMulti={true}
            options={ProductCategorySelect.options}
          />
        </li>
        <li className={s.searchParam}>
          <label className={s.label}>{ProductSortTypeSelect.title}</label>
          <Select
            defaultValue={ProductSortTypeSelect.defaultOption}
            onChange={handleSortTypeSelect}
            options={[
              ProductSortTypeSelect.defaultOption,
              ...ProductSortTypeSelect.options,
            ]}
          />
        </li>
      </ul>
    </DropDown>
  );
}
