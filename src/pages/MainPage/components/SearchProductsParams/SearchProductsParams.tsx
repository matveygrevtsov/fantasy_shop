import cn from "classnames";
import Select from "react-select";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";
import { useSearchProductsParams } from "./useSearchProductsParams";

import s from "./SearchProductsParams.module.css";

export interface Props {
  onProductCategorySelect: (productCategories: ProductCategory[]) => void;
  onProductsSortTypeSelect: (productsSortType: ProductsSortType) => void;
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
            defaultValue={ProductSortTypeSelect.options[0]}
            onChange={handleSortTypeSelect}
            options={ProductSortTypeSelect.options}
          />
        </li>
      </ul>
    </DropDown>
  );
}
