import { useEffect, useState } from "react";
import { UserStatus } from "../../constants/enums";
import { firebaseApi } from "../../firebaseApi";
import { store } from "../../store";

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

  useEffect(() => {
    if (store.getUserStatus() === UserStatus.Error) {
      firebaseApi.signOut();
      setState({
        status: SignInPageStatus.Error,
        errorCode: "",
      });
    }
  }, []);

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
