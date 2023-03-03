import { useSignUpForm } from "./useSignUpForm";
import { constants } from "../../../../constants";
import cn from "classnames";

import s from "./SignUpForm.module.css";

interface Props {
  className?: string;
  onSubmit: (email: string, password: string) => void;
}

export const SignUpForm: React.FC<Props> = ({ className, onSubmit }) => {
  const {
    emailInput,
    passwordInput,
    passwordRepeatInput,
    elementForErrorText,
    submitButton,
  } = constants.signUpForm;
  const { refRoot } = useSignUpForm(onSubmit);

  return (
    <div ref={refRoot} className={cn(className, s.root)}>
      <label className={s.label}>{emailInput.label}</label>
      <input type="email" id={emailInput.id} />
      <label className={s.label}>{passwordInput.label}</label>
      <input type="password" id={passwordInput.id} />
      <label className={s.label}>{passwordRepeatInput.label}</label>
      <input type="password" id={passwordRepeatInput.id} />
      <div className={s.elementForErrorText} id={elementForErrorText.id} />
      <button className={s.submitButton} id={submitButton.id}>
        {submitButton.text}
      </button>
    </div>
  );
};
