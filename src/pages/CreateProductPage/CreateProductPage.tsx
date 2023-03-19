import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserStatus } from "../../constants/enums";
import { texts } from "../../constants/texts";
import { store } from "../../store";
import { CreateProductForm } from "./components/CreateProductForm/CreateProductForm";
import {
  CreateProductPageStatus,
  useCreateProductPage,
} from "./useCreateProductPage";

import s from "./CreateProductPage.module.css";

export const CreateProductPage = observer(() => {
  const { handleSubmit, state, handleStartTyping } = useCreateProductPage();
  const userStatus = store.getUserStatus();
  const { createProductFailText, createProductSuccessText } =
    texts.CreateProductPage;

  if (
    userStatus === UserStatus.Loading ||
    state.status === CreateProductPageStatus.Loading
  ) {
    return <Preloader />;
  }

  if (userStatus !== UserStatus.Admin) {
    return <Navigate to={RoutePath.MainPage} />;
  }

  return (
    <div className={s.root}>
      <h2 className={s.title}>{texts.CreateProductPage.title}</h2>
      <CreateProductForm
        onSubmit={handleSubmit}
        className={s.createProductForm}
        onStartTyping={handleStartTyping}
      />
      {state.status === CreateProductPageStatus.Error && (
        <span className={s.error}>{createProductFailText}</span>
      )}
      {state.status === CreateProductPageStatus.Success && (
        <span className={s.success}>{createProductSuccessText}</span>
      )}
    </div>
  );
});
