import { FieldErrors } from "react-hook-form";
import { FormValues } from "../../SignUpForm/useSignUpForm";
import cn from "classnames";

import s from "./ErrorLabel.module.css";

interface Props {
  errors: FieldErrors<FormValues>;
  className?: string;
}

export function ErrorLabel({ errors, className }: Props) {
  const rootClassName = cn(s.root, className);
  if (errors.Email) {
    return <span className={rootClassName}>{errors.Email.message}</span>;
  }
  if (errors.Password) {
    return <span className={rootClassName}>{errors.Password.message}</span>;
  }
  if (errors.RepeatPassword) {
    return (
      <span className={rootClassName}>{errors.RepeatPassword.message}</span>
    );
  }
  return null;
}
