import { SearchProductsForm } from "./components/SearchProductsForm/SearchProductsForm";
import { Status, useMainPage } from "./useMainPage";
import { Preloader } from "../../components/Preloader/Preloader";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import s from "./MainPage.module.css";

export const MainPage = () => {
  const { state, handleSubmit } = useMainPage();

  return (
    <div className={s.root}>
      <SearchProductsForm onSubmit={handleSubmit} />
      {state.status === Status.Loading && <Preloader />}
      {state.status === Status.Error && (
        <h2>
          При скачивании списка продуктов произошла ошибка. Пожалуйста,
          повторите позже.
        </h2>
      )}
      {state.status === Status.Success && (
        <ProductsList products={state.products} className={s.productsList} />
      )}
    </div>
  );
};
