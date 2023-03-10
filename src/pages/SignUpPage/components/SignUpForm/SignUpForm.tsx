import { useSignUpForm } from "./useSignUpForm";
import { texts } from "../../../../constants/texts";
import { SignUpFormInput } from "../../../../constants/enums";
import { SubmitButton } from "../../../../components/Header/components/SubmitButton/SubmitButton";
import { ErrorLabel } from "../components/ErrorLabel/ErrorLabel";
import cn from "classnames";

import s from "./SignUpForm.module.css";

interface Props {
  className?: string;
  onSubmit: (email: string, password: string) => void;
}

export const SignUpForm: React.FC<Props> = ({ className, onSubmit }) => {
  const { submit, register, formState } = useSignUpForm(onSubmit);
  const { SignUpForm } = texts.SignUpPage;

  return (
    <form onSubmit={submit} className={cn(className, s.root)}>
      <label className={s.label}>{SignUpForm.labels.Email}</label>
      <input
        {...register(SignUpFormInput.Email)}
        type="email"
        className={s.input}
      />
      <label className={s.label}>{SignUpForm.labels.Password}</label>
      <input
        {...register(SignUpFormInput.Password)}
        type="password"
        className={s.input}
      />
      <label className={s.label}>{SignUpForm.labels.RepeatPassword}</label>
      <input
        {...register(SignUpFormInput.RepeatPassword)}
        className={s.input}
        type="password"
      />
      {!formState.isValid && <ErrorLabel errors={formState.errors} />}
      <SubmitButton disabled={!formState.isValid} className={s.submitButton}>
        {SignUpForm.submitButtonText}
      </SubmitButton>
    </form>
  );
};
