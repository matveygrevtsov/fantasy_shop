import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import { store } from "../../store";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { SignUpPageStatus, useSignUpPage } from "./useSignUpPage";
import { Preloader } from "../../components/Preloader/Preloader";
import { texts } from "../../constants/texts";
import { routes } from "../../constants/routes";
import { FirebaseErrorText } from "../../components/FirebaseErrorText/FirebaseErrorText";
import { UserStatus } from "../../constants/enums";

import s from "./SignUpPage.module.css";

export const SignUpPage = observer(() => {
  const userStatus = store.getUserState().status;
  const { title, alreadyHasAccountText } = texts.SignUpPage;
  const { state, handleSubmit, handleStartTyping } = useSignUpPage();

  if (userStatus === UserStatus.Client) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (userStatus === UserStatus.Admin) {
    return <Navigate to={routes.CreateProductPage.path} />;
  }

  if (
    state.status === SignUpPageStatus.Loading ||
    userStatus === UserStatus.Loading
  ) {
    return (
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <SignUpForm
        onSubmit={handleSubmit}
        onStartTyping={handleStartTyping}
        className={s.form}
      />
      <Link className={s.linkToSignInPage} to={routes.SignInPage.path}>
        {alreadyHasAccountText}
      </Link>
      {state.status === SignUpPageStatus.Error && (
        <FirebaseErrorText errorCode={state.errorCode} />
      )}
    </div>
  );
});
