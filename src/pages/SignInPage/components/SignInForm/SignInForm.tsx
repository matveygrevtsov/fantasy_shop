import { useSignInForm } from "./useSignInForm";
import { SubmitButton } from "../../../../components/Header/components/SubmitButton/SubmitButton";
import { texts } from "../../../../constants/texts";
import { SignInFormInput } from "../../../../constants/enums";
import cn from "classnames";

import s from "./SignInForm.module.css";

interface Props {
  onSubmit: (email: string, password: string) => void;
  onStartTyping?: () => void;
  className?: string;
}

export const SignInForm: React.FC<Props> = ({
  onSubmit,
  onStartTyping,
  className,
}) => {
  const { submit, register, formState } = useSignInForm(onSubmit);

  return (
    <form
      onClick={onStartTyping}
      onSubmit={submit}
      className={cn(className, s.root)}
    >
      <label className={s.label}>
        {texts.SignInPage.SignInForm.labels.Email}
      </label>
      <input {...register(SignInFormInput.Email)} className={s.input} />
      {formState.errors.Email && (
        <span className={s.error}>{formState.errors.Email.message}</span>
      )}
      <label className={s.label}>
        {texts.SignInPage.SignInForm.labels.Password}
      </label>
      <input
        {...register(SignInFormInput.Password)}
        className={s.input}
        type="password"
      />
      {formState.errors.Password && (
        <span className={s.error}>{formState.errors.Password.message}</span>
      )}
      <SubmitButton className={s.submitButton} disabled={!formState.isValid}>
        {texts.SignInPage.SignInForm.submitButtonText}
      </SubmitButton>
    </form>
  );
};
