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
      errorCode: string;
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
        errorCode: error.code,
      })
    );
  };

  const handleStartTyping = () => {
    if (state.status !== SignInPageStatus.Error) return;
    setState({
      status: SignInPageStatus.WaitingForUserInput,
    });
  };

  return { state, handleSubmit, handleStartTyping };
}
