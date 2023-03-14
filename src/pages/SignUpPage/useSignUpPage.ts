import { useEffect, useState } from "react";
import { UserStatus } from "../../constants/enums";
import { firebaseApi } from "../../firebaseApi";
import { store } from "../../store";

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

  useEffect(() => {
    if (store.getUserState().status === UserStatus.Error) {
      firebaseApi.signOut();
      setState({
        status: SignUpPageStatus.Error,
        errorCode: "",
      });
    }
  }, []);

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
