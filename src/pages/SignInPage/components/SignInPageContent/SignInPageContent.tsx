import { FirebaseErrorText } from "../../../../components/FirebaseErrorText/FirebaseErrorText";
import { texts } from "../../../../constants/texts";
import { SignInForm } from "../SignInForm/SignInForm";
import { Status, useSignInPageContent } from "./useSignInPageContent";
import { Preloader } from "../../../../components/Preloader/Preloader";

import s from "./SignInPageContent.module.css";

export const SignInPageContent = () => {
  const { handleSubmit, handleStartTyping, state } = useSignInPageContent();
  const { title } = texts.SignInPage;

  if (state.status === Status.Loading) {
    return (
      <div className={s.root}>
        <h2 className={s.title}>{title}</h2>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.root}>
      <h2 className={s.title}>{title}</h2>
      <SignInForm
        onSubmit={handleSubmit}
        onStartTyping={handleStartTyping}
        className={s.form}
      />
      {state.status === Status.Error && (
        <FirebaseErrorText errorCode={state.errorCode} />
      )}
    </div>
  );
};
