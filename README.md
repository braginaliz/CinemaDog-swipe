# CinemaSwipe

Tinder-подобный интерфейс для выбора фильмов. Свайпайте карточки влево или вправо,
чтобы пропустить или сохранить фильм в список «Буду смотреть».

## Демо
https://braginaliz.github.io/CinemaDog-swipe/
## Функционал

- **Свайп-колода** — стек карточек, верхняя перетаскивается мышью/пальцем
- **Свайп вправо** — сохранить фильм в «Буду смотреть»
- **Свайп влево** — пропустить
- **Кнопки управления** — альтернатива свайпу
- **Клавиатура** — `←` пропустить, `→` сохранить, `Ctrl+Z` отменить
- **Undo** — отмена последнего свайпа
- **Watchlist** — список сохранённых с возможностью удаления
- **Автозагрузка** — новые фильмы подгружаются когда колода заканчивается
- **Сохранение** — watchlist хранится в localStorage
- **Адаптивность** — работает на мобильных (≥375px) и десктопе
- - **Моковые данные** — офлайн-режим с подборкой фильмов о собаках (раскомментировать в `api.ts`)

## Стек

| Технология | Версия |
|---|---|
| React | 19 |
| TypeScript | strict |
| Vite | 7 |
| Tailwind CSS | 4 |
| Zustand | 5 |
| Framer Motion | 12 |

## API

Данные загружаются с [jsonfakery.com](https://jsonfakery.com/movies/random/20).

> Если сервис недоступен (например, без VPN), в файле `src/api/movies.ts`
> раскомментируйте моковую функцию `fetchRandomMovies` с подборкой фильмов о собаках
> и закомментируйте оригинальную.

## Установка и запуск
```bash
# Клонировать репозиторий
git clone 

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

## Структура проекта

CINEMADOG-SWIPE/
├── public/
├── src/
│   ├── api/
│   │   └── movies.ts              # Загрузка фильмов с jsonfakery.com
│   ├── components/
│   │   ├── Card/
│   │   │   ├── MovieCard.tsx      # Карточка фильма
│   │   │   └── SwipeCard.tsx      # Обёртка с логикой свайпа
│   │   ├── Deck/
│   │   │   └── Deck.tsx           # Колода карточек
│   │   ├── icons/
│   │   │   ├── ChevronIcon.tsx
│   │   │   ├── FilmIcon.tsx
│   │   │   ├── HeaderFilmIcon.tsx
│   │   │   ├── HeaderHeartIcon.tsx
│   │   │   ├── HeartIcon.tsx
│   │   │   ├── index.ts
│   │   │   ├── LayersIcon.tsx
│   │   │   ├── PersonIcon.tsx
│   │   │   ├── StarBadgeIcon.tsx
│   │   │   ├── StarIcon.tsx
│   │   │   └── XIcon.tsx
│   │   ├── Layout/
│   │   │   └── Header.tsx         # Шапка приложения
│   │   ├── UI/
│   │   │   ├── ActionButtons.tsx  # Кнопки управления свайпом
│   │   │   ├── EmptyState.tsx     # Экран пустой колоды
│   │   │   ├── ErrorMessage.tsx   # Отображение ошибок
│   │   │   └── Loader.tsx         # Индикатор загрузки
│   │   └── Watchlist/
│   │       └── Watchlist.tsx      # Список «Буду смотреть»
│   ├── hooks/
│   │   └── useKeyboardSwipe.ts    # Хук управления клавиатурой
│   ├── store/
│   │   └── useMovieStore.ts       
│   ├── types/
│   │   └── movie.ts               # TypeScript-типы
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


