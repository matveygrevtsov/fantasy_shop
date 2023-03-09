import { SearchProductsForm } from "./components/SearchProductsForm/SearchProductsForm";
import { useMainPage } from "./useMainPage";

import s from "./MainPage.module.css";

export const MainPage = () => {
  const { handleSubmit } = useMainPage();

  return (
    <div className={s.root}>
      <SearchProductsForm onSubmit={handleSubmit} />
    </div>
  );
};
