import { observer } from "mobx-react-lite";
import { SignInPageStatus, useSignInPage } from "./useSignInPage";
import { store, UserStatus } from "../../store";
import { Navigate } from "react-router-dom";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { Preloader } from "../../components/Preloader/Preloader";
import { texts } from "../../constants/texts";
import { routes } from "../../constants/routes";
import { FirebaseErrorText } from "../../components/FirebaseErrorText/FirebaseErrorText";

import s from "./SignInPage.module.css";

export const SignInPage = observer(() => {
  const userState = store.getUserState();
  const { title } = texts.SignInPage;
  const { state, handleSubmit, handleStartTyping } = useSignInPage();

  if (userState.userStatus === UserStatus.LoggedIn) {
    return <Navigate to={routes.CartPage.path} />;
  }

  if (state.status === SignInPageStatus.Loading) {
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
      <SignInForm
        onSubmit={handleSubmit}
        onStartTyping={handleStartTyping}
        className={s.form}
      />
      {state.status === SignInPageStatus.Error && (
        <FirebaseErrorText errorCode={state.errorCode} />
      )}
    </div>
  );
});
