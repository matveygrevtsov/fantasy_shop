import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInput } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";

export interface FormValues {
  [SignUpFormInput.Email]: string;
  [SignUpFormInput.Password]: string;
  [SignUpFormInput.RepeatPassword]: string;
}

const formSchema = object().shape({
  [SignUpFormInput.Email]: string()
    .required(texts.SignUpPage.SignUpForm.errors.emptyEmail)
    .email(texts.SignUpPage.SignUpForm.errors.invalidEmail),
  [SignUpFormInput.Password]: string()
    .required(texts.SignUpPage.SignUpForm.errors.emptyPassword)
    .min(4, texts.SignUpPage.SignUpForm.errors.shortPassword),
  [SignUpFormInput.RepeatPassword]: string().oneOf(
    [ref(SignUpFormInput.Password)],
    texts.SignUpPage.SignUpForm.errors.passwordsMismatch
  ),
});

export const useSignUpForm = (
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
