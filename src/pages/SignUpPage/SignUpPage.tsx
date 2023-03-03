import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { constants } from "../../constants";
import { store, UserStatus } from "../../store";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";

import s from "./SignUpPage.module.css";

export const SignUpPage = observer(() => {
  const userState = store.getUserState();
  const { routes } = constants;

  // Если юзер залогинен - редиректим его с этой страницы
  if (userState.userStatus === UserStatus.Client) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (
    userState.userStatus === UserStatus.Guest ||
    userState.userStatus === UserStatus.Error
  ) {
    return (
      <div>
        <Header />
        <h2 className={s.title}>Регистрация</h2>
        <SignUpForm className={s.form} />
        {userState.userStatus === UserStatus.Error && (
          <span className={s.error}>{userState.error}</span>
        )}
      </div>
    );
  }

  // По умолчанию отображаем лоадер
  return <div>Загрузка...</div>;
});
