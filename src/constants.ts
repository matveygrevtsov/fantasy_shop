export const constants = {
  routes: {
    MainPage: {
      path: `/`,
      title: "Главная",
      showInNavBarForGuest: true,
      showInNavBarForLoggedIn: true,
    },
    CartPage: {
      path: `/cart`,
      title: "Корзина",
      showInNavBarForGuest: false,
      showInNavBarForLoggedIn: true,
    },
    SignUpPage: {
      path: `/signup`,
      title: "Зарегистрироваться",
      showInNavBarForGuest: true,
      showInNavBarForLoggedIn: false,
    },
    SignInPage: {
      path: `/signin`,
      title: "Авторизоваться",
      showInNavBarForGuest: true,
      showInNavBarForLoggedIn: false,
    },
  },
  SignUpPage: {
    title: "Зарегистрироваться",
    alreadyHasAccountText: "Уже есть аккаунт ? Авторизуйтесь.",
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
  Header: {
    logoutText: "Выйти",
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
