import { SearchProductsForm } from "./components/SearchProductsForm/SearchProductsForm";

import s from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={s.root}>
      <SearchProductsForm />
    </div>
  );
};
