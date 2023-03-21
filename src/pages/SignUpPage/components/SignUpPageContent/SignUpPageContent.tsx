import { FirebaseErrorText } from "../../../../components/FirebaseErrorText/FirebaseErrorText";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { Status, useSignUpPageContent } from "./useSignUpPageContent";
import { texts } from "../../../../constants/texts";
import { Preloader } from "../../../../components/Preloader/Preloader";

import s from "./SignUpPageContent.module.css";

export const SignUpPageContent = () => {
  const { state, handleSubmit, handleStartTyping } = useSignUpPageContent();
  const { title } = texts.SignUpPage;

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
      <SignUpForm
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
