import { constants } from "../../../../constants";

interface Props {
  root: HTMLDivElement;
  onSubmit: (email: string, password: string) => void;
  onUserTyping: (isSubmitButtonDisabled: boolean, errorText: string) => void;
}

export enum SignUpFormStatus {
  Invalid = "Invalid",
  Valid = "Valid",
}

type SignUpFormState =
  | {
      status: SignUpFormStatus.Invalid;
    }
  | {
      status: SignUpFormStatus.Valid;
      email: string;
      password: string;
    };

export class SignUpFormValidator {
  // Переменные, которые приходят из пропсов:
  private readonly root: HTMLDivElement;
  private readonly onSubmit: (email: string, password: string) => void;
  private readonly onUserTyping: (
    isSubmitButtonDisabled: boolean,
    errorText: string
  ) => void;
  // Переменные, которые инициализируются в конструкторе:
  private state: SignUpFormState;
  private readonly inputEmail: HTMLInputElement;
  private readonly inputPassword: HTMLInputElement;
  private readonly inputPasswordRepeat: HTMLInputElement;
  private readonly timer: number;

  constructor({ root, onSubmit, onUserTyping }: Props) {
    this.root = root;
    this.onSubmit = onSubmit;
    this.onUserTyping = onUserTyping;
    const {
      emailInput,
      passwordInput,
      passwordRepeatInput,
      checkInputsValidationTimeInterval_ms,
    } = constants.signUpForm;
    this.inputEmail = this.getInputById(emailInput.id);
    this.inputPassword = this.getInputById(passwordInput.id);
    this.inputPasswordRepeat = this.getInputById(passwordRepeatInput.id);
    this.timer = window.setInterval(
      () => this.handleTyping(),
      checkInputsValidationTimeInterval_ms
    );
    this.state = {
      status: SignUpFormStatus.Invalid,
    };
    this.handleTyping();
  }

  /**
   * Обрабатывает событие, когда юзер ввёл валидные данные в форму и нажал кнопку "submit".
   */
  public submit() {
    if (this.state.status !== SignUpFormStatus.Valid) return;
    const { email, password } = this.state;
    this.onSubmit(email, password);
  }

  /**
   * Выполняет unmount.
   */
  public unmount() {
    window.clearInterval(this.timer);
  }

  /**
   * Возвращает HTMLInputElement внутри формы по айдишнику.
   * @param id Айдишник искомого элемента.
   */
  private getInputById(id: string): HTMLInputElement {
    const result: HTMLInputElement | null = this.root.querySelector(`#${id}`);
    if (result === null) {
      throw new Error(`HTMLInputElement с id=${id} не был найден.`);
    }
    return result;
  }

  /**
   * Обновляет стейт в зависимости от введённых в форму значений.
   * @param email Электронная почта.
   * @param password Пароль.
   * @param passwordRepeat Пароль, введённый повторно.
   */
  private mapFormValuesToState(
    email: string,
    password: string,
    passwordRepeat: string
  ) {
    if (email === "" && password === "" && passwordRepeat === "") {
      this.state = {
        status: SignUpFormStatus.Invalid,
      };
      this.onUserTyping(true, "");
      return;
    }
    if (!this.isEmailValid(email)) {
      this.state = {
        status: SignUpFormStatus.Invalid,
      };
      this.onUserTyping(true, constants.signUpForm.errorText.invalidEmail);
      return;
    }
    if (!this.isPasswordValid(password)) {
      this.state = {
        status: SignUpFormStatus.Invalid,
      };
      this.onUserTyping(true, constants.signUpForm.errorText.invalidPassword);
      return;
    }
    if (password !== passwordRepeat) {
      this.state = {
        status: SignUpFormStatus.Invalid,
      };
      this.onUserTyping(true, constants.signUpForm.errorText.passwordMismatch);
      return;
    }
    this.state = {
      status: SignUpFormStatus.Valid,
      email,
      password,
    };
    this.onUserTyping(false, "");
  }

  /**
   * Обрабатывает событие, когда юзер печатает свои данные в форму.
   */
  private handleTyping(): void {
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const passwordRepeat = this.inputPasswordRepeat.value;
    this.mapFormValuesToState(email, password, passwordRepeat);
  }

  /**
   * Возвращает true, если пароль удовлетворяет требованиям, и false - в противном случае.
   * @param password Пароль.
   */
  private isPasswordValid(password: string): boolean {
    return password.length >= 5;
  }

  /**
   * Возвращает true, если электронная почта удовлетворяет требованиям, и false - в противном случае.
   * @param email электронная почта.
   */
  private isEmailValid(email: string): boolean {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
    ) {
      return false;
    }
    return true;
  }
}
