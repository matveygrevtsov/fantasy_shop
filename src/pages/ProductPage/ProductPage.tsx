import { Preloader } from "../../components/Preloader/Preloader";
import { ProductContent } from "./components/ProductContent/ProductContent";
import { Status, useProductPage } from "./useProductPage";

export const ProductPage = () => {
  const { state } = useProductPage();

  if (state.status === Status.Success) {
    return <ProductContent {...state.data} />;
  }

  if (state.status === Status.Error) {
    return (
      <h1>
        Произошла ошибка при скачивании данных продукта. Попробуйте зайти на эту
        страницу позже.
      </h1>
    );
  }

  if (state.status === Status.NotFound) {
    return <h1>Продукт с таким id не найден.</h1>;
  }

  return <Preloader />;
};
