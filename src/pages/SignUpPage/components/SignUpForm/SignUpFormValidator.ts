import { constants } from "../../../../constants";

interface Props {
  root: HTMLDivElement;
  onSubmit: (email: string, password: string) => void;
}

export enum SignUpFormStatus {
  Init = "Init",
  Error = "Error",
  Success = "Success",
}

type SignUpFormState =
  | {
      status: SignUpFormStatus.Init;
    }
  | {
      status: SignUpFormStatus.Error;
      error: string;
    }
  | {
      status: SignUpFormStatus.Success;
      email: string;
      password: string;
    };

export class SignUpFormValidator {
  // Переменные, которые приходят из пропсов:
  private readonly root: HTMLDivElement;
  private readonly onSubmit: (email: string, password: string) => void;
  // Переменные, которые инициализируются в конструкторе:
  private state: SignUpFormState;
  private readonly inputEmail: HTMLInputElement;
  private readonly inputPassword: HTMLInputElement;
  private readonly inputPasswordRepeat: HTMLInputElement;
  private readonly elementForErrorText: HTMLDivElement;
  private readonly submitButton: HTMLButtonElement;
  private readonly timer: number;

  constructor({ root, onSubmit }: Props) {
    this.root = root;
    this.onSubmit = onSubmit;
    const {
      emailInput,
      passwordInput,
      passwordRepeatInput,
      elementForErrorText,
      submitButton,
      checkInputsValidationTimeInterval_ms,
    } = constants.signUpForm;
    this.inputEmail = this.getHTMLElementById(
      emailInput.id
    ) as HTMLInputElement;
    this.inputPassword = this.getHTMLElementById(
      passwordInput.id
    ) as HTMLInputElement;
    this.inputPasswordRepeat = this.getHTMLElementById(
      passwordRepeatInput.id
    ) as HTMLInputElement;
    this.elementForErrorText = this.getHTMLElementById(
      elementForErrorText.id
    ) as HTMLDivElement;
    this.submitButton = this.getHTMLElementById(
      submitButton.id
    ) as HTMLButtonElement;
    this.submitButton.addEventListener("click", () => this.submit());
    this.timer = window.setInterval(
      () => this.handleTyping(),
      checkInputsValidationTimeInterval_ms
    );
    this.state = {
      status: SignUpFormStatus.Init,
    };
  }

  /**
   * Выполняет unmount.
   */
  public unmount() {
    window.clearInterval(this.timer);
    this.submitButton.removeEventListener("click", () => this.submit());
  }

  /**
   * Обрабатывает событие, когда юзер ввёл валидные данные в форму и нажал кнопку "submit".
   */
  private submit() {
    if (this.state.status !== SignUpFormStatus.Success) return;
    const { email, password } = this.state;
    this.onSubmit(email, password);
  }

  /**
   * Возвращает HTML-элемент внутри формы по айдишнику.
   * @param id Айдишник искомого элемента.
   */
  private getHTMLElementById(id: string): HTMLElement {
    const result: HTMLElement | null = this.root.querySelector(`#${id}`);
    if (result === null) {
      throw new Error(`HTML-элемент с id=${id} не был найден.`);
    }
    return result;
  }

  /**
   * Обновляет стейт.
   * @param state Новое значение стейта.
   */
  private setState(state: SignUpFormState) {
    this.state = state;
    switch (this.state.status) {
      case SignUpFormStatus.Success:
        this.elementForErrorText.style.display = "none";
        this.submitButton.disabled = false;
        break;
      case SignUpFormStatus.Error:
        this.elementForErrorText.innerHTML = this.state.error;
        this.elementForErrorText.style.display = "block";
        this.submitButton.disabled = true;
        break;
      default:
        this.elementForErrorText.style.display = "none";
        this.submitButton.disabled = true;
    }
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
      this.setState({
        status: SignUpFormStatus.Init,
      });
      return;
    }
    if (!this.isEmailValid(email)) {
      this.setState({
        status: SignUpFormStatus.Error,
        error: "Невалидный email",
      });
      return;
    }
    if (!this.isPasswordValid(password)) {
      this.setState({
        status: SignUpFormStatus.Error,
        error: "Невалидный пароль",
      });
      return;
    }
    if (password !== passwordRepeat) {
      this.setState({
        status: SignUpFormStatus.Error,
        error: "Пароли не совпадают",
      });
      return;
    }
    this.setState({
      status: SignUpFormStatus.Success,
      email,
      password,
    });
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
