import { observer } from "mobx-react-lite";
import { SignInPageStatus, useSignInPage } from "./useSignInPage";
import { store, UserStatus } from "../../store";
import { Navigate } from "react-router-dom";
import { constants } from "../../constants";
import { Header } from "../../components/Header/Header";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { Preloader } from "../../components/Preloader/Preloader";

import s from "./SignInPage.module.css";

export const SignInPage = observer(() => {
  const userState = store.getUserState();
  const { title } = constants.SignInPage;
  const { routes } = constants;
  const { state, handleSubmit, handleSignInAgainClick } = useSignInPage();

  // Если юзер залогинен - редиректим его с этой страницы
  if (userState.userStatus === UserStatus.LoggedIn) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (state.status === SignInPageStatus.WaitingForUserInput) {
    return (
      <div>
        <Header />
        <h2 className={s.title}>{title}</h2>
        <SignInForm onSubmit={handleSubmit} className={s.form} />
      </div>
    );
  }

  if (state.status === SignInPageStatus.Error) {
    return (
      <div>
        <Header />
        <h2>Ошибка авторизации: {state.error}</h2>
        <button onClick={handleSignInAgainClick}>Попробовать ещё раз</button>
      </div>
    );
  }

  // По умолчанию отображаем прелоадер
  return (
    <div>
      <Header />
      <Preloader className={s.preloader} />
    </div>
  );
});
