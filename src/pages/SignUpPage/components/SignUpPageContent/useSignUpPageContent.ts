import { useState } from "react";
import { firebaseApi } from "../../../../firebaseApi";

export enum Status {
  Init = "Init",
  Loading = "Loading",
  Error = "Error",
}

type State =
  | {
      status: Status.Init | Status.Loading;
    }
  | {
      status: Status.Error;
      errorCode: string;
    };

export const useSignUpPageContent = () => {
  const [state, setState] = useState<State>({
    status: Status.Init,
  });

  const handleSubmit = (email: string, password: string) => {
    setState({
      status: Status.Loading,
    });
    firebaseApi.signUp(email, password).catch((error) =>
      setState({
        status: Status.Error,
        errorCode: error.code,
      })
    );
  };

  const handleStartTyping = () => {
    if (state.status !== Status.Error) return;
    setState({
      status: Status.Init,
    });
  };

  return { state, handleSubmit, handleStartTyping };
};
