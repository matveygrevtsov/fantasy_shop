import { useEffect, useRef } from "react";
import { SignUpFormValidator } from "./SignUpFormValidator";

export const useSignUpForm = (
  onSubmit: (email: string, password: string) => void
) => {
  const refRoot = useRef<HTMLDivElement>(null);
  const refSignUpFormValidator = useRef<SignUpFormValidator | null>(null);

  useEffect(() => {
    const root = refRoot.current;
    if (root !== null && refSignUpFormValidator.current === null) {
      refSignUpFormValidator.current = new SignUpFormValidator({
        root,
        onSubmit,
      });
    }
  }, []);

  return { refRoot };
};
