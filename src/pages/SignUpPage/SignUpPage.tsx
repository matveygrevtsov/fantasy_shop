import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import { store } from "../../store";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { SignUpPageStatus, useSignUpPage } from "./useSignUpPage";
import { Preloader } from "../../components/Preloader/Preloader";
import { texts } from "../../constants/texts";
import { FirebaseErrorText } from "../../components/FirebaseErrorText/FirebaseErrorText";
import { RoutePath, UserStatus } from "../../constants/enums";

import s from "./SignUpPage.module.css";

export const SignUpPage = observer(() => {
  const userStatus = store.getUserStatus();
  const { title, alreadyHasAccountText } = texts.SignUpPage;
  const { state, handleSubmit, handleStartTyping } = useSignUpPage();

  if (userStatus === UserStatus.Client) {
    return <Navigate to={RoutePath.CartPage} />;
  }

  if (userStatus === UserStatus.Admin) {
    return <Navigate to={RoutePath.CreateProductPage} />;
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
      <Link className={s.linkToSignInPage} to={RoutePath.SignInPage}>
        {alreadyHasAccountText}
      </Link>
      {state.status === SignUpPageStatus.Error && (
        <FirebaseErrorText errorCode={state.errorCode} />
      )}
    </div>
  );
});
