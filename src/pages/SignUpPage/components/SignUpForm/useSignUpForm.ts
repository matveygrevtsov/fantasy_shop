import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInput } from "../../../../constants/enums";
import { texts } from "../../../../constants/texts";
import { PASSWORD_MIN_LENGTH } from "../../../../constants/authFormValidation";

export interface FormValues {
  [SignUpFormInput.Email]: string;
  [SignUpFormInput.Password]: string;
  [SignUpFormInput.RepeatPassword]: string;
}

const formSchema = object().shape({
  [SignUpFormInput.Email]: string()
    .required(texts.SignUpPage.SignUpForm.validationErrors.emptyEmail)
    .email(texts.SignUpPage.SignUpForm.validationErrors.invalidEmail),
  [SignUpFormInput.Password]: string()
    .required(texts.SignUpPage.SignUpForm.validationErrors.emptyPassword)
    .min(
      PASSWORD_MIN_LENGTH,
      texts.SignUpPage.SignUpForm.validationErrors.shortPassword
    ),
  [SignUpFormInput.RepeatPassword]: string().oneOf(
    [ref(SignUpFormInput.Password)],
    texts.SignUpPage.SignUpForm.validationErrors.passwordsMismatch
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
