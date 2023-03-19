import {
  EditProductPageStatus,
  useEditProductPage,
} from "./useEditProductPage";
import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { RoutePath, UserStatus } from "../../constants/enums";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { EditProductForm } from "./components/EditProductForm/EditProductForm";

import s from "./EditProductPage.module.css";

export const EditProductPage = observer(() => {
  const { state } = useEditProductPage();
  const userStatus = store.getUserStatus();

  if (userStatus !== UserStatus.Admin && userStatus !== UserStatus.Loading) {
    return <Navigate to={RoutePath.MainPage} />;
  }

  if (state.status === EditProductPageStatus.Error) {
    return (
      <div className={s.root}>
        <span>
          К сожалению, не удалось скачать данные продукта. Повторите попытку
          позже.
        </span>
      </div>
    );
  }

  if (state.status === EditProductPageStatus.NotFound) {
    return (
      <div className={s.root}>
        <span>Продукт с таким айдишником не найден.</span>
      </div>
    );
  }

  if (state.status === EditProductPageStatus.Success) {
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

  return <Preloader />;
});
