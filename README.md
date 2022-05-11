# Parser questions

Application download git repository with JavaScript questions, parse them, transform them, and save in `json` format. Written using `node.js`,`fs`. Works on `Linux` and `Windows` operating systems.

## Requirements

You will need the following things properly installed on your computer:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) Node.js v16.14.2, npm v8.5.0

## Installation

* `git clone <repository-url>`
* `cd nwjpkk0pcgi`
* `npm install`

Working environment:
- `node -v` v14.17.6
- `npm -v` 6.14.15
- `npm list -g --depth=0`
```
├── @babel/plugin-transform-modules-commonjs@7.17.9
├── fs@0.0.1-security
├── jest@27.5.1
└── prettier@2.6.2
```
- `npm list -g --depth=0`
```
├── @angular/cli@12.2.7
├── concurrently@6.3.0
├── expo-cli@5.3.0
├── nodemon@2.0.13
└── npm@6.14.15
```
- `System`
```
Ubuntu 20
64-bit
```

## Run

Run command `npm run download` to download git repository to `download` folder. Then run `npm run start` to parse questions and save result to `dist` folder.

## Темы

### Основные

- `BASICS`

`use strict`; Логические операторы `&&` `||`; Условные операторы `if` `?`; Переменные; Написание тестов; Стиль кода; Рефакторинг; Названия переменных; Нечитаемый код; Комментарии; Дебаггинг; Циклы, `switch`
- `OBJECTS`

Копирование объектов и ссылки; Сборка мусора; Методы объекта, `this`; `Symbol`; Флаги и дескрипторы свойств: `writable`, `enumerable`, `configurable`; Геттеры и сеттеры
- `DATA_TYPES`

Типы данных; Операторы сравнения `==` `===`; Преобразования типов; `toString`, `Array.isArray`; Числа, точность; Строки, сравнение строк, спецсимволы; Перебор объектов и массивов; `Map`, `Set`, `WeakMap`, `WeakSet`; `rest`/`spread` операторы; `Date`; `JSON`
- `FUNCTIONS`

Рекурсия и стек; Замыкание; Область видимости; `new Function`; Глобальный объект; `setTimeout` `setInterval`; Декораторы, `bind` `call` `apply`; Контекст функции; Стрелочные функции
- `CLASSES`

`new` `class`, Прототипное наследование; `prototype`; `__proto__`; Наследование; Статические свойства и методы; Расширение встроенных классов; `instanceof`; Миксины
- `ERRORS`

`try..catch/finally`; `throw new Error`
- `ASYNC`

`fetch`; Колбеки; `Promise`; Цепочки промисов; Статические методы промисов; Микрозадачи, макрозадачи; `async`, `await`; Генераторы `*`, итераторы
- `MODULES`

`AMD`, `CommonJS`, `UMD`, `ES6`; `import`/`export`

### Дополнительные

- `STORAGE`

`Cookie`, `localStorage`, `sessionStorage`
- `EVENTS`

`capturing`, `bubbling`; `event`; `addEventListener`, `onClick`, `preventDefault`, `keydown`
- `TRICKS`
- `TYPESCRIPT`
- `ECMASCRIPT`
- `ALGORITHMS`

Задачи с собеседований; Задачи на логику; Алгоритмы; Полифилы