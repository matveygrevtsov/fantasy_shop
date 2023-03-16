import { observer } from "mobx-react-lite";
import { SignInPageStatus, useSignInPage } from "./useSignInPage";
import { store } from "../../store";
import { Navigate } from "react-router-dom";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { Preloader } from "../../components/Preloader/Preloader";
import { texts } from "../../constants/texts";
import { FirebaseErrorText } from "../../components/FirebaseErrorText/FirebaseErrorText";
import { RoutePath, UserStatus } from "../../constants/enums";

import s from "./SignInPage.module.css";

export const SignInPage = observer(() => {
  const userStatus = store.getUserState().status;
  const { title } = texts.SignInPage;
  const { state, handleSubmit, handleStartTyping } = useSignInPage();

  if (userStatus === UserStatus.Client) {
    return <Navigate to={RoutePath.CartPage} />;
  }

  if (userStatus === UserStatus.Admin) {
    return <Navigate to={RoutePath.CreateProductPage} />;
  }

  if (
    state.status === SignInPageStatus.Loading ||
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
