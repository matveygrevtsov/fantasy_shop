import {
  FirebaseErrors,
  SignInFormInput,
  SignUpFormInput,
} from "../types/auth";
import { ProductCategory, ProductsSortType } from "../types/product";
import { RoutePath } from "../types/routing";

export const texts = {
  ImagesRemover: {
    title: "Удалить лишние картинки",
  },
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
    CreateProductForm: {
      labels: {
        name: "Наименование",
        description: "Описание",
        price: "Цена",
        amount: "Количество в наличии",
        productCategories: "Категории",
      },
      validationErrors: {
        emptyName: "Наименование не должно быть пустым",
        emptyDescription: "Описание не должно быть пустым",
        invalidPrice: "Невалидное значение цены",
        emptyPrice: "Цена не указана",
        invalidAmount: "Невалидное количество товара в наличии",
        emptyAmount: "Количество товара в наличии не указано",
      },
      submitButtonText: "Создать",
    },
    createProductFailText:
      "К сожалению, не удалось создать продукт. Попробуйте позже.",
    createProductSuccessText: "Продукт успешно создан.",
  },
  EditProductPage: {
    title: "Редактировать продукт",
    productNotFoundText: "Продукт с таким идентификатором не найден",
    fetchProductDataError:
      "К сожалению, не удалось скачать данные продукта. Повторите попытку позже.",
    savingChangesSuccess: "Сохранения успешно изменены.",
    savingChangesError:
      "Не удалось сохранить изменения. Пожалуйста, повторите попытку позже.",
    viewChangesLink: "Посмотреть изменения на странице продукта.",
    editProductForm: {
      labels: {
        name: "Наименование",
        description: "Описание",
        price: "Цена",
        amount: "Количество в наличии",
        productCategories: "Категории",
        addNewImages: "Загрузить новые картинки",
      },
      validationErrors: {
        emptyName: "Наименование не должно быть пустым",
        emptyDescription: "Описание не должно быть пустым",
        invalidPrice: "Невалидное значение цены",
        emptyPrice: "Цена не указана",
        invalidAmount: "Невалидное количество товара в наличии",
        emptyAmount: "Количество товара в наличии не указано",
      },
      submitText: "Сохранить изменения",
    },
  },
  Header: {
    logoutText: "Выйти",
    guestRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Регистрация",
        path: RoutePath.SignUpPage,
      },
      {
        title: "Вход",
        path: RoutePath.SignInPage,
      },
    ],
    clientRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Корзина",
        path: RoutePath.CartPage,
      },
    ],
    adminRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Создать продукт",
        path: RoutePath.CreateProductPage,
      },
    ],
  },
  Footer: {
    copyright: "© 2023 Copyright: Fantasy Shop",
  },
  ProductSearchPage: {
    searchErrorText:
      "При скачивании продуктов произошла ошибка. Пожалуйста, повторите попытку позже.",
    noResultsText:
      "К сожалению, продуктов, соответствующих параметрам поиска, не найдено.",
    ProductsSearchForm: {
      searchInputPlaceholder: "Введите название продукта",
      searchProductsParamsTitle: "Фильтры",
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
  },
  ImagesUploader: {
    placeholder:
      "Перетяните несколько картинок, либо нажмите, чтобы выбрать их с вашего устройства.",
  },
  ProductActions: {
    addToCartText: "Добавить в корзину",
    addToCartSuccessText: "Товар успешно добавлен в корзину.",
    addToCartPartialSuccessText:
      "К сожалению, вас кто-то опередил, и в наличии осталось меньше товара, чем вы хотели бы добавить в корзину. Количество товара, которое было добавлено в корзину: ",
    addToCartSoldOutText:
      "К сожалению, вас кто-то опередил. Данный товар больше не в наличии.",
    addToCartErrorText:
      "Не удалось добавить товар в корзину. Повторите попытку позже.",
    editText: "Редактировать",
    currency: "₽",
    productInvalidAmount: "Введено невалидное количество товара",
    productAmountLimit: "К сожалению, в наличии нет такого количества товара",
  },
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
  CartPage: {
    title: "Корзина",
    fetchProductsDataError:
      "Не удалось скачать данные продуктов из вашей корзины. Попробуйте зайти в корзину позже.",
  },
};
