import { useEffect, useRef } from "react";
import { SignUpFormController } from "./SignUpFormController";

export const useSignUpForm = (
  onSubmit: (email: string, password: string) => void
) => {
  const refRoot = useRef<HTMLDivElement>(null);
  const refSignUpFormController = useRef<SignUpFormController | null>(null);

  useEffect(() => {
    const root = refRoot.current;
    if (root !== null && refSignUpFormController.current === null) {
      refSignUpFormController.current = new SignUpFormController({
        root,
        onSubmit,
      });
    }
  }, []);

  return { refRoot };
};
