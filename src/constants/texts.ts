import {
  FirebaseErrors,
  ProductCategory,
  ProductsSortType,
  RouteName,
  SignInFormInput,
  SignUpFormInput,
} from "./enums";

export const texts = {
  FirebaseErrors: {
    [FirebaseErrors.AuthUserNotFound]: "Пользователь с таким email не найден.",
    [FirebaseErrors.AuthWrongPassword]: "Невалидный пароль.",
    [FirebaseErrors.AuthEmailAlreadyInUse]:
      "Предоставленный адрес электронной почты уже используется существующим пользователем.",
    defaultErrorText: "Произошла ошибка. Повторите попытку позже",
  },
  SignUpPage: {
    title: "Зарегистрироваться",
    alreadyHasAccountText: "Уже есть аккаунт ? Авторизуйтесь.",
    SignUpForm: {
      labels: {
        [SignUpFormInput.Email]: "Почта",
        [SignUpFormInput.Password]: "Пароль",
        [SignUpFormInput.RepeatPassword]: "Повторите пароль",
      },
      validationErrors: {
        emptyEmail: "Email не указан",
        invalidEmail: "Невалидный email",
        emptyPassword: "Пароль не указан",
        shortPassword: "Длина пароля должна быть не менее 4 символа",
        passwordsMismatch: "Пароли не совпадают",
      },
      submitButtonText: "Зарегистрироваться",
    },
  },
  SignInPage: {
    title: "Авторизоваться",
    SignInForm: {
      labels: {
        [SignInFormInput.Email]: "Почта",
        [SignInFormInput.Password]: "Пароль",
      },
      validationErrors: {
        emptyEmail: "Email не указан",
        invalidEmail: "Невалидный email",
        emptyPassword: "Пароль не указан",
        invalidPassword: "Невалидный пароль",
      },
      submitButtonText: "Войти",
    },
  },
  CreateProductPage: {
    title: "Создать продукт",
  },
  Header: {
    logoutText: "Выйти",
    routesTitles: {
      [RouteName.MainPage]: "Главная",
      [RouteName.SignUpPage]: "Регистрация",
      [RouteName.SignInPage]: "Вход",
      [RouteName.CartPage]: "Корзина",
      [RouteName.CreateProductPage]: "Создание продукта",
    },
  },
  Footer: {
    copyright: "© 2023 Copyright: Fantasy Shop",
  },
  ProductsSearchForm: {
    searchInputPlaceholder: "Введите название продукта",
    searchProductsParamsTitle: "Фильтры",
    ProductCategorySelect: {
      title: "Категории",
      placeholder: "Выбрать категории",
      options: [
        {
          value: ProductCategory.Goblins,
          label: "Гоблины",
        },
        {
          value: ProductCategory.Orks,
          label: "Орки",
        },
        {
          value: ProductCategory.Dwarfs,
          label: "Гномы",
        },
      ],
    },
    ProductSortTypeSelect: {
      title: "Сортировка",
      options: [
        {
          value: ProductsSortType.DescendingOrderPrice,
          label: "По убыванию цены",
        },
        {
          value: ProductsSortType.AscendingOrderPrice,
          label: "По возрастанию цены",
        },
      ],
    },
  },
  ImagesUploader: {
    placeholder:
      "Перетяните несколько картинок (в формате .png, .jpg), либо нажмите, чтобы выбрать их с вашего устройства.",
  },
};
