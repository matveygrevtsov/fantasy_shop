import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import { store, UserStatus } from "../../store";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { SignUpPageStatus, useSignUpPage } from "./useSignUpPage";
import { Preloader } from "../../components/Preloader/Preloader";
import { texts } from "../../constants/texts";
import { routes } from "../../constants/routes";
import { FirebaseErrorText } from "../../components/FirebaseErrorText/FirebaseErrorText";

import s from "./SignUpPage.module.css";

export const SignUpPage = observer(() => {
  const userState = store.getUserState();
  const { title, alreadyHasAccountText } = texts.SignUpPage;
  const { state, handleSubmit, handleStartTyping } = useSignUpPage();

  if (userState.userStatus === UserStatus.LoggedIn) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (state.status === SignUpPageStatus.Loading) {
    return (
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <Preloader className={s.preloader} />
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
