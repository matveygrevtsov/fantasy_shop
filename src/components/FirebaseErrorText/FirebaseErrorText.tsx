import { texts } from "../../constants/texts";
import cn from "classnames";

import s from "./FirebaseErrorText.module.css";

interface Props {
  errorCode: string;
  className?: string;
}

export function FirebaseErrorText({ errorCode, className }: Props) {
  const rootClassName = cn(s.root, className);
  const { FirebaseErrors } = texts;
  const { defaultErrorText } = FirebaseErrors;
  const errors = FirebaseErrors as Record<string, string>;
  if (errors[errorCode]) {
    return <span className={rootClassName}>errors[errorCode]</span>;
  }
  return (
    <span className={rootClassName}>
      {defaultErrorText}, {errorCode}
    </span>
  );
}
