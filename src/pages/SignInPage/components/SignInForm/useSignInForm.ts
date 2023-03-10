import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInFormInput } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";

export interface FormValues {
  [SignInFormInput.Email]: string;
  [SignInFormInput.Password]: string;
}

const formSchema = object().shape({
  [SignInFormInput.Email]: string()
    .required(texts.SignInPage.SignInForm.errors.emptyEmail)
    .email(texts.SignInPage.SignInForm.errors.invalidEmail),
  [SignInFormInput.Password]: string()
    .required(texts.SignInPage.SignInForm.errors.emptyPassword)
    .min(4, texts.SignInPage.SignInForm.errors.invalidPassword),
});

export const useSignInForm = (
  onSubmit: (email: string, password: string) => void
) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: "onTouched",
    // @ts-ignore
    resolver: yupResolver(formSchema),
  });

  const submit = handleSubmit(({ Email, Password }: FormValues) =>
    onSubmit(Email, Password)
  );

  return { submit, register, formState };
};
