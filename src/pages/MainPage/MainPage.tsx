import { SearchProductsForm } from "./components/SearchProductsForm/SearchProductsForm";
import { StateStatus, useMainPage } from "./useMainPage";
import { Preloader } from "../../components/Preloader/Preloader";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import s from "./MainPage.module.css";

export const MainPage = () => {
  const { state, handleSubmit } = useMainPage();

  return (
    <div className={s.root}>
      <SearchProductsForm
        className={s.searchProductsForm}
        onSubmit={handleSubmit}
      />
      {state.status === StateStatus.Loading && <Preloader />}
      {state.status === StateStatus.Error && (
        <h2>
          При скачивании списка продуктов произошла ошибка. Пожалуйста,
          повторите позже.
        </h2>
      )}
      {state.status === StateStatus.Success && (
        <ProductsList products={state.products} />
      )}
    </div>
  );
};
