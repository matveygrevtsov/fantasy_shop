import cn from "classnames";
import Select from "react-select";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { texts } from "../../../../constants/texts";

import s from "./SearchProductsParams.module.css";

interface Props {
  className?: string;
}

export function SearchProductsParams({ className }: Props) {
  const {
    searchProductsParamsTitle,
    ProductCategorySelect,
    ProductSortTypeSelect,
  } = texts.ProductsSearchForm;

  return (
    <DropDown
      className={cn(s.root, className)}
      title={searchProductsParamsTitle}
    >
      <ul className={s.searchParams}>
        <li className={s.searchParam}>
          <label className={s.label}>{ProductCategorySelect.title}</label>
          <Select
            placeholder={ProductCategorySelect.placeholder}
            onChange={console.log}
            isMulti={true}
            options={ProductCategorySelect.options}
          />
        </li>
        <li className={s.searchParam}>
          <label className={s.label}>{ProductSortTypeSelect.title}</label>
          <Select
            defaultValue={ProductSortTypeSelect.options[0]}
            onChange={console.log}
            options={ProductSortTypeSelect.options}
          />
        </li>
      </ul>
    </DropDown>
  );
}
