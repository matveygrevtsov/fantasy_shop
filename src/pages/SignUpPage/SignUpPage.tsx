import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { constants } from "../../constants";
import { store, UserStatus } from "../../store";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { SignUpPageStatus, useSignUpPage } from "./useSignUpPage";
import { Preloader } from "../../components/Preloader/Preloader";

import s from "./SignUpPage.module.css";

export const SignUpPage = observer(() => {
  const userState = store.getUserState();
  const { routes } = constants;
  const { title, alreadyHasAccountText } = constants.SignUpPage;
  const { state, handleSubmit, handleStartRegistrationAgainClick } =
    useSignUpPage();

  // Если юзер залогинен - редиректим его с этой страницы
  if (userState.userStatus === UserStatus.LoggedIn) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (state.status === SignUpPageStatus.WaitingForUserInput) {
    return (
      <div>
        <Header />
        <div className={s.container}>
          <h2 className={s.title}>{title}</h2>
          <SignUpForm onSubmit={handleSubmit} className={s.form} />
          <Link className={s.linkToSignInPage} to={routes.SignInPage.path}>
            {alreadyHasAccountText}
          </Link>
        </div>
      </div>
    );
  }

  if (state.status === SignUpPageStatus.Error) {
    return (
      <div>
        <Header />
        <div className={s.container}>
          <h2 className={s.title}>Ошибка регистрации</h2>
          <div className={s.error}>{state.error}</div>
          <button
            className={s.signUpAgainButton}
            onClick={handleStartRegistrationAgainClick}
          >
            Попробовать ещё раз
          </button>
          <Link className={s.linkToSignInPage} to={routes.SignInPage.path}>
            {alreadyHasAccountText}
          </Link>
        </div>
      </div>
    );
  }

  // По умолчанию отображаем прелоадер
  return (
    <div>
      <Header />
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <Preloader className={s.preloader} />
      </div>
    </div>
  );
});
