import { SavingChangesError } from "../SavingChangesError/SavingChangesError";
import { SavingChangesSuccess } from "../SavingChangesSuccess/SavingChangesSuccess";
import { EditProductForm } from "../EditProductForm/EditProductForm";
import { Status, useEditProductPageContent } from "./useEditProductPageContent";
import { Preloader } from "../../../../components/Preloader/Preloader";
import { texts } from "../../../../constants/texts";

import s from "./EditProductPageContent.module.css";

export const EditProductPageContent = () => {
  const { state, handleSubmit } = useEditProductPageContent();
  const { title, productNotFoundText, fetchProductDataError } =
    texts.EditProductPage;

  if (state.status === Status.SavingChangesSuccess) {
    return (
      <div className={s.root}>
        <SavingChangesSuccess />
      </div>
    );
  }

  if (state.status === Status.SavingChangesError) {
    return (
      <div className={s.root}>
        <SavingChangesError errorMessage={state.errorMessage} />
      </div>
    );
  }

  // Если удалось скачать данные продукта по айдишнику, взятому из query-параметра.
  if (state.status === Status.ProductDataLoadedSuccessfully) {
    return (
      <div className={s.root}>
        <h2 className={s.title}>{title}</h2>
        <EditProductForm
          onSubmit={handleSubmit}
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
        <span>{productNotFoundText}</span>
      </div>
    );
  }

  // Если произошла ошибка при скачивании данных продукта.
  if (state.status === Status.Error) {
    return (
      <div className={s.root}>
        <span>{fetchProductDataError}</span>
      </div>
    );
  }

  // По умолчанию отображаем прелоадер.
  return <Preloader />;
};
