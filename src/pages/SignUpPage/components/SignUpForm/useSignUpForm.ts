import { useEffect, useRef, useState } from "react";
import { SignUpFormValidator } from "./SignUpFormValidator";

interface State {
  isSubmitButtonDisabled: boolean;
  errorText: string;
}

export const useSignUpForm = (
  onSubmit: (email: string, password: string) => void
) => {
  const [state, setState] = useState<State>({
    isSubmitButtonDisabled: true,
    errorText: "",
  });
  const refRoot = useRef<HTMLFormElement>(null);
  const refFormValidator = useRef<SignUpFormValidator | null>(null);

  function handleUserTyping(
    isSubmitButtonDisabled: boolean,
    errorText: string
  ) {
    setState({ isSubmitButtonDisabled, errorText });
  }

  function handleSubmit() {
    refFormValidator.current?.submit();
  }

  useEffect(() => {
    const root = refRoot.current;
    if (root !== null && refFormValidator.current === null) {
      refFormValidator.current = new SignUpFormValidator({
        root,
        onSubmit,
        onUserTyping: handleUserTyping,
      });
    }
  }, [onSubmit]);

  return { refRoot, state, handleSubmit };
};
