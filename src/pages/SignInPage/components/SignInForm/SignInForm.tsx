import { useSignInForm } from "./useSignInForm";
import { constants } from "../../../../constants";
import cn from "classnames";

import s from "./SignInForm.module.css";

interface Props {
  className?: string;
  onSubmit: (email: string, password: string) => void;
}

export const SignInForm: React.FC<Props> = ({ className, onSubmit }) => {
  const { emailInput, passwordInput, submitText } =
    constants.SignInPage.SignInForm;
  const { refRoot, state, handleSubmit } = useSignInForm(onSubmit);

  return (
    <div ref={refRoot} className={cn(className, s.root)}>
      <label className={s.label}>{emailInput.label}</label>
      <input type="email" id={emailInput.id} />
      <label className={s.label}>{passwordInput.label}</label>
      <input type="password" id={passwordInput.id} />
      {state.errorText && <div className={s.error}>{state.errorText}</div>}
      <button
        onClick={handleSubmit}
        disabled={state.isSubmitButtonDisabled}
        className={s.submitButton}
      >
        {submitText}
      </button>
    </div>
  );
};
