import { texts } from "../../../../constants/texts";

import s from "./SearchProductsForm.module.css";

export const SearchProductsForm = () => {
  return (
    <form className={s.root}>
      <ul className={s.searchParams}>
        <li>
          <select>
            <option disabled selected>
              {texts.ProductCategorySelect.title}
            </option>
            <option>Орки</option>
            <option>Гномы</option>
            <option>Гоблины</option>
          </select>
        </li>
        <li>
          <select>
            <option disabled selected>
              Сортировка
            </option>
            <option>По убыванию цены</option>
            <option>По возрастанию цены</option>
          </select>
        </li>
      </ul>
      <input className={s.searchInput} />
    </form>
  );
};
