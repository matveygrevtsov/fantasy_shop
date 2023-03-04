import { useState } from "react";
import { firebaseApi } from "../../firebaseApi";

export enum SignInPageStatus {
  WaitingForUserInput = "WaitingForUserInput",
  Loading = "Loading",
  Error = "Error",
}

type SignInPageState =
  | {
      status: SignInPageStatus.WaitingForUserInput | SignInPageStatus.Loading;
    }
  | {
      status: SignInPageStatus.Error;
      error: string;
    };

export function useSignInPage() {
  const [state, setState] = useState<SignInPageState>({
    status: SignInPageStatus.WaitingForUserInput,
  });

  const handleSubmit = (email: string, password: string) => {
    setState({
      status: SignInPageStatus.Loading,
    });
    firebaseApi.signIn(email, password).catch((error) =>
      setState({
        status: SignInPageStatus.Error,
        error: error.message,
      })
    );
  };

  const handleSignInAgainClick = () => {
    setState({
      status: SignInPageStatus.WaitingForUserInput,
    });
  };

  return { state, handleSubmit, handleSignInAgainClick };
}
