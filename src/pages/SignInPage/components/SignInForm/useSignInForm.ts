import { useEffect, useRef, useState } from "react";
import { SignInFormValidator } from "./SignInFormValidator";

interface State {
  isSubmitButtonDisabled: boolean;
  errorText: string;
}

export const useSignInForm = (
  onSubmit: (email: string, password: string) => void
) => {
  const [state, setState] = useState<State>({
    isSubmitButtonDisabled: true,
    errorText: "",
  });
  const refRoot = useRef<HTMLDivElement>(null);
  const refFormValidator = useRef<SignInFormValidator | null>(null);

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
      refFormValidator.current = new SignInFormValidator({
        root,
        onSubmit,
        onUserTyping: handleUserTyping,
      });
    }
  }, []);

  return { refRoot, state, handleSubmit };
};
