import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { UserStatus } from "../../constants/enums";
import { routes } from "../../constants/routes";
import { texts } from "../../constants/texts";
import { store } from "../../store";
import { CreateProductForm } from "./components/CreateProductForm/CreateProductForm";

import s from "./CreateProductPage.module.css";

export const CreateProductPage = observer(() => {
  const userStatus = store.getUserState().status;

  if (userStatus === UserStatus.Loading) {
    return <Preloader />;
  }

  if (userStatus !== UserStatus.Admin) {
    return <Navigate to={routes.MainPage.path} />;
  }

  return (
    <div className={s.root}>
      <h2 className={s.title}>{texts.CreateProductPage.title}</h2>
      <CreateProductForm
        onSubmit={console.log}
        className={s.createProductForm}
      />
    </div>
  );
});
