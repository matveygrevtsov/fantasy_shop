import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { texts } from "../../../../constants/texts";
import { PASSWORD_MIN_LENGTH } from "../../../../constants/authFormValidation";
import { SignInFormInput } from "../../../../types/auth";

export interface FormValues {
  [SignInFormInput.Email]: string;
  [SignInFormInput.Password]: string;
}

const formSchema = object().shape({
  [SignInFormInput.Email]: string()
    .required(texts.SignInPage.SignInForm.validationErrors.emptyEmail)
    .email(texts.SignInPage.SignInForm.validationErrors.invalidEmail),
  [SignInFormInput.Password]: string()
    .required(texts.SignInPage.SignInForm.validationErrors.emptyPassword)
    .min(
      PASSWORD_MIN_LENGTH,
      texts.SignInPage.SignInForm.validationErrors.invalidPassword
    ),
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
