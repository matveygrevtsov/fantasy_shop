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
      error: string;
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
        error: error.message,
      })
    );
  };

  const handleStartRegistrationAgainClick = () => {
    setState({
      status: SignUpPageStatus.WaitingForUserInput,
    });
  };

  return { state, handleSubmit, handleStartRegistrationAgainClick };
};
