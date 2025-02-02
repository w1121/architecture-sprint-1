# Разбиение на микрофронтенды

## Задание 1

### Уровень 1. Проектирование
Для создания микрофронтендов буду использовать Webpack Module Federation.
В этом курсе подробно рассмотрены два решения Webpack Module Federation и Single SPA.
Был выбран Webpack Module Federation по следующим причинам:
 - в спринте есть подробный пример разделения монолита с помощью Webpack Module Federation. Следовательно, потребуется меньше времени для разделения на микрофронтенды.
 - проект полностью на React. По заданию надо лишь разделить проект на микрофронтенды. Поэтому не понадобится одна из ключевых особенностей Single SPA - Framework agnostic.

### Уровень 2. Планирование изменений
Проект Mesto можно разделить на три микрофронтенда: users, photos, hosts.
 - Микрофронтенд users: создание профиля и его редактирование.
 - Микрофронтенд photos: загрузка фотографий, удаление фотографий, сбор и учёт лайков под фото.
 - Микрофронтенд hosts: подключение микрофронтендов users и photos, routing и layout проекта.

#### Новая структура проекта
```
/photos-microfrontend
    /src
        /blocks
            /card               // Стили для карточки
            /places             // Стили для листинга карточек
            /popup              // Стили для всплываающих окон с просмотром и загрзки фотограций
        /components
            AddPlacePopup.js    // Модальное окно с формой для загрузки фотографий
            Card.js             // Карточка с фотографией
            ImagePopup.js       // Модальное окно для просмотра фотографии
            Places.js           // Листинг карточек. Содержит функционал: получение фотографий через API, сбор и учёт лайков под фото, удаление фото
            PopupWithForm.js    // Шаблон формы в модальном окне
        /images                 // Изображения для вёрстки
        /utils
            api.js              // Методы API для работы с фотографиями: получение списка, загрузка и удаление фотографий, сбор и учёт лайков
/users-microfrontend
    /src
        /blocks
            /auth-form
            /login
            /profile
        /components
            App.js              // Логика отображения блоков Login и Register, отправка событий об успешной/неуспешной авторизации или регистрации
            EditAvatarPopup.js  // Моадльное окно с формой редатирования аватара
            EditProfilePopup.js // Модальное окно с формой редактирования профился
            Login.js            // Форма авторизации
            PopupWithForm.js    // Шаблон формы в модальном окне
            Profile.js          // Блок с выводом профиля пользователя. Содержит функционал: редактирование автара и редактирования профиля
            Register.js         // Форма реригстрации
        /contexts
            CurrentUserContext.js // Используется для глобального хранения данных о пользователе
        /images                 // Изображения для вёрстки
        /utils
            api.js              // Методы API: получение профиля пользователе, редактирование профиля, редактирование аватара
            auth.js             // Методы API: авторизация, регистрация, проверка токена
/host-microfrontend
    /src
        /blocks                 // Стили шапки, подвала и основного каркаса проекта (layout), стили для мадального окна
        /components
            App.js              // Основной компонент проекта
            Footer.js           // Подвал сайта
            Header.js           // Шапка сайта
            InfoTooltip.js      // Модальное окно с информационным сообщением
            Main.js             // Главная страница проекта
            ProtectedRoute.js   // Обёртка для навигации только для авторизованных пользователей
        /images                 // Изображения для вёрстки
        /utils
            api.js              // Методы API:  получение профиля пользователя
        /vendor
        bootstrap.js            // Для загрзуки приложения через динамический импорт (иначе будут недоступны зависимости, указанные в shared)
        favicon.ico             // favicon проекта
        index.css               // подключение стилей из /blocks
        index.html              // шаблон страниц проекта
        index.js                // точка входа
```

### Уровень 3. Запуск готового кода

Для запуска проекта необходимо:

- перейти в /frontend/photos-microfrontend и выполнить команды
```
npm i
```
```
npm start
```
- перейти в /frontend/users-microfrontend и выполнить команды
```
npm i
```
```
npm start
```
- перейти в /frontend/hosts-microfrontend и выполнить команды
```
npm i
```
```
npm start
```
- открыть в браузере [http://localhost:3030]  


## Задание 2 

// TODO: 