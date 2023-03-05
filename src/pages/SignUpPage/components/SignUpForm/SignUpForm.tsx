import { useSignUpForm } from "./useSignUpForm";
import { constants } from "../../../../constants";
import cn from "classnames";

import s from "./SignUpForm.module.css";

interface Props {
  className?: string;
  onSubmit: (email: string, password: string) => void;
}

export const SignUpForm: React.FC<Props> = ({ className, onSubmit }) => {
  const { emailInput, passwordInput, passwordRepeatInput, submitText } =
    constants.SignUpPage.SignUpForm;
  const { refRoot, state, handleSubmit } = useSignUpForm(onSubmit);

  return (
    <form ref={refRoot} className={cn(className, s.root)}>
      <label className={s.label}>{emailInput.label}</label>
      <input className={s.input} type="email" id={emailInput.id} />
      <label className={s.label}>{passwordInput.label}</label>
      <input className={s.input} type="password" id={passwordInput.id} />
      <label className={s.label}>{passwordRepeatInput.label}</label>
      <input className={s.input} type="password" id={passwordRepeatInput.id} />
      {state.errorText && <div className={s.error}>{state.errorText}</div>}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={state.isSubmitButtonDisabled}
        className={s.submitButton}
      >
        {submitText}
      </button>
    </form>
  );
};
