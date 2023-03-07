import { Select } from "../../../../components/Select/Select";
import { ProductCategory, ProductsSortType } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <form className={s.root}>
      <ul className={s.searchParams}>
        <li className={s.selectSearchParam}>
          <Select<ProductCategory>
            onChange={(option) => alert(option)}
            options={texts.ProductCategorySelect.variants}
            title={texts.ProductCategorySelect.title}
          />
        </li>
        <li className={s.selectSearchParam}>
          <Select<ProductsSortType>
            onChange={(option) => alert(option)}
            options={texts.ProductSortTypeSelect.variants}
            title={texts.ProductSortTypeSelect.title}
          />
        </li>
      </ul>
      <input className={s.searchInput} />
    </form>
  );
};
