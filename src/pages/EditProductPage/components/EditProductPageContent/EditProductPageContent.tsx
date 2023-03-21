import { EditProductForm } from "../EditProductForm/EditProductForm";
import { Status, useEditProductPageContent } from "./useEditProductPageContent";
import { Preloader } from "../../../../components/Preloader/Preloader";

import s from "./EditProductPageContent.module.css";

export const EditProductPageContent = () => {
  const { state } = useEditProductPageContent();

  // Если удалось скачать данные продукта по айдишнику, взятому из query-параметра.
  if (state.status === Status.Success) {
    return (
      <div className={s.root}>
        <h2 className={s.title}>Редактирование продукта</h2>
        <EditProductForm
          productDataToEdit={state.productDataToEdit}
          className={s.form}
        />
      </div>
    );
  }

  // Если в базе данных отсутствует продукт с таким айдишником.
  if (state.status === Status.NotFound) {
    return (
      <div className={s.root}>
        <span>Продукт с таким айдишником не найден.</span>
      </div>
    );
  }

  // Если произошла ошибка при скачивании данных продукта.
  if (state.status === Status.Error) {
    return (
      <div className={s.root}>
        <span>
          К сожалению, не удалось скачать данные продукта. Повторите попытку
          позже.
        </span>
      </div>
    );
  }

  // По умолчанию отображаем прелоадер.
  return <Preloader />;
};
