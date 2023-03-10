import { useSignInForm } from "./useSignInForm";
import { SubmitButton } from "../../../../components/Header/components/SubmitButton/SubmitButton";
import { texts } from "../../../../constants/texts";
import { SignInFormInput } from "../../../../constants/enums";
import { AuthFormErrorLabel } from "../../../../components/AuthFormErrorLabel/AuthFormErrorLabel";
import cn from "classnames";

import s from "./SignInForm.module.css";

interface Props {
  className?: string;
  onSubmit: (email: string, password: string) => void;
}

export const SignInForm: React.FC<Props> = ({ className, onSubmit }) => {
  const { submit, register, formState } = useSignInForm(onSubmit);

  return (
    <form onSubmit={submit} className={cn(className, s.root)}>
      <label className={s.label}>
        {texts.SignInPage.SignInForm.labels.Email}
      </label>
      <input {...register(SignInFormInput.Email)} className={s.input} />
      <label className={s.label}>
        {texts.SignInPage.SignInForm.labels.Password}
      </label>
      <input
        {...register(SignInFormInput.Password)}
        className={s.input}
        type="password"
      />
      {!formState.isValid && <AuthFormErrorLabel errors={formState.errors} />}
      <SubmitButton className={s.submitButton} disabled={!formState.isValid}>
        {texts.SignInPage.SignInForm.submitButtonText}
      </SubmitButton>
    </form>
  );
};
