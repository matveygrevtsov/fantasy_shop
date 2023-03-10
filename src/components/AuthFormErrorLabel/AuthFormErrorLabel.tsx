import cn from "classnames";
import { FieldErrors, FieldValues } from "react-hook-form";

import s from "./AuthFormErrorLabel.module.css";

interface Props<T extends FieldValues> {
  errors: FieldErrors<T>;
  className?: string;
}

export function AuthFormErrorLabel<T extends FieldValues>({
  errors,
  className,
}: Props<T>) {
  const values = Object.values(errors) as Array<{ message: string }>;
  const messages = values
    .map(({ message }) => message)
    .filter((message) => message);

  if (messages.length === 0) return null;

  return <span className={cn(s.root, className)}>{messages[0]}</span>;
}
