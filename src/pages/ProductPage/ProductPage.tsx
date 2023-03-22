import { Preloader } from "../../components/Preloader/Preloader";
import { ProductPageContent } from "./components/ProductPageContent/ProductPageContent";
import { Status, useProductPage } from "./useProductPage";

export const ProductPage = () => {
  const { state } = useProductPage();

  if (state.status === Status.Success) {
    return <ProductPageContent product={state.product} />;
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
