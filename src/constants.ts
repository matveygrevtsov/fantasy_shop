export const constants = {
  routes: {
    MainPage: {
      path: `${process.env.PUBLIC_URL}/`,
      title: "Главная",
      enableForGuest: true,
      enableForLoggedIn: true,
    },
    CartPage: {
      path: `${process.env.PUBLIC_URL}/cart`,
      title: "Корзина",
      enableForGuest: false,
      enableForLoggedIn: true,
    },
    SignUpPage: {
      path: `${process.env.PUBLIC_URL}/signup`,
      title: "Зарегистрироваться",
      enableForGuest: true,
      enableForLoggedIn: false,
    },
    SignInPage: {
      path: `${process.env.PUBLIC_URL}/signin`,
      title: "Авторизоваться",
      enableForGuest: true,
      enableForLoggedIn: false,
    },
  },
  SignUpPage: {
    title: "Зарегистрироваться",
    SignUpForm: {
      emailInput: {
        id: "email",
        label: "Введите email",
      },
      passwordInput: {
        id: "password",
        label: "Введите пароль",
      },
      passwordRepeatInput: {
        id: "passwordRepeat",
        label: "Повторите пароль",
      },
      submitText: "Зарегистрироваться",
      checkInputsValidationTimeInterval_ms: 1000,
      invalidEmailErrorText: "Невалидный email.",
      invalidPasswordErrorText: "Невалидный пароль.",
      passwordMismatchErrorText: "Пароли не совпадают.",
    },
  },
  SignInPage: {
    title: "Авторизоваться",
    SignInForm: {
      emailInput: {
        id: "email",
        label: "Введите email",
      },
      passwordInput: {
        id: "password",
        label: "Введите пароль",
      },
      submitText: "Авторизоваться",
      checkInputsValidationTimeInterval_ms: 1000,
      invalidEmailErrorText: "Невалидный email.",
      invalidPasswordErrorText: "Невалидный пароль.",
    },
  },
  firebaseConfig: {
    apiKey: "AIzaSyAJxRpwaEfKfGYkXjyk6dPAy82noOBLKXg",
    authDomain: "fantasyshop-a4a0b.firebaseapp.com",
    projectId: "fantasyshop-a4a0b",
    storageBucket: "fantasyshop-a4a0b.appspot.com",
    messagingSenderId: "891225945011",
    appId: "1:891225945011:web:041f3f08fef9cc63c011c6",
    measurementId: "G-3Q8P19HFC6",
  },
};
