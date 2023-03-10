import { useState } from "react";
import { firebaseApi } from "../../firebaseApi";

export enum SignUpPageStatus {
  WaitingForUserInput = "WaitingForUserInput",
  Loading = "Loading",
  Error = "Error",
}

type SignUpPageState =
  | {
      status: SignUpPageStatus.WaitingForUserInput | SignUpPageStatus.Loading;
    }
  | {
      status: SignUpPageStatus.Error;
      errorCode: string;
    };

export const useSignUpPage = () => {
  const [state, setState] = useState<SignUpPageState>({
    status: SignUpPageStatus.WaitingForUserInput,
  });

  const handleSubmit = (email: string, password: string) => {
    setState({
      status: SignUpPageStatus.Loading,
    });
    firebaseApi.signUp(email, password).catch((error) =>
      setState({
        status: SignUpPageStatus.Error,
        errorCode: error.code,
      })
    );
  };

  const handleStartTyping = () => {
    if (state.status !== SignUpPageStatus.Error) return;
    setState({
      status: SignUpPageStatus.WaitingForUserInput,
    });
  };

  return { state, handleSubmit, handleStartTyping };
};
