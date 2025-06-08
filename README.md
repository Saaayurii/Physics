
## 🎨 Добро пожаловать в приложение для **Структурного синтеза программ по спецификациям:Физика,Геометрия,Цепи**:

![image](https://github.com/Saaayurii/Physics/blob/main/public/assets/Physics.png)

---

## Особенности 🌟

* **Tailwind UI:** Стильный интерфейс на базе Tailwind CSS.
* **Анимации и Эффекты:** Улучшай UX с помощью динамических элементов.
* **Адаптивность:** Идеальное отображение на любых устройствах.
* **Авторизация через Clerk:** Вход по email, Google и 9+ соцсетей.
* **Обработка Форм:** Валидация на клиенте через `react-hook-form`, обработка ошибок сервера через `react-toast`.
* **Stripe Подписки:** Ежемесячная оплата через Stripe.
* **Бесплатный Тариф и Лимиты:** Контролируемый доступ к API на фритире.
* **REST API Маршруты:** Обработка `POST`, `DELETE`, `GET` через route handlers (`app/api`).
* **Прямой Доступ к Базе:** Получай данные прямо в серверных компонентах React без API (настоящая магия!).
* **Компонентные Связи:** Эффективное взаимодействие между серверными и дочерними компонентами.
* **Переиспользуемые Макеты:** Используй шаблоны для единого дизайна.
* **Структура Папок:** Организованная структура проекта в Next.js 14 с App Router для масштабируемости.

---

## Технологический Стек 🛠️

* **Next.js:** React-фреймворк для современных веб-приложений.
* **Tailwind CSS:** Утилитарный CSS-фреймворк для быстрой стилизации.
* **MongoDB:** NoSQL база данных с гибкой структурой хранения.
* **Clerk:** Современное решение для авторизации в Next.js.
* **Prisma:** Современный ORM для доступа к данным.
* **Zustand:** Лёгкий state-менеджер для React.
* **Stripe:** Приём платежей и подписок.

---

## 🚦 Начало Работы

### Необходимые Условия 🚧

* [Node.js](https://nodejs.org/) — установлен на вашем компьютере для запуска проекта.
* [Git](https://git-scm.com/) — система контроля версий для клонирования и управления репозиторием.
* [npm](https://www.npmjs.com/) — пакетный менеджер для установки зависимостей.
* [MongoDB Atlas](https://cloud.mongodb.com/) — облачная база данных для хранения данных пользователей и задач.
* [Stripe](https://stripe.com/) — для обработки платежей и подписок (требуется API ключ и Webhook Secret).
* [Clerk](https://clerk.dev/) — для аутентификации пользователей через email и соцсети (необходимы публичный и секретный ключи).
* [Replicate](https://replicate.com/) — для генерации изображений, видео и музыки на основе AI (требуется API токен).
* [OpenAI](https://platform.openai.com/) — для диалогов и генерации кода (нужен ваш OpenAI API ключ).

---

### Переменные Окружения ⚙️

Добавь следующие переменные в `.env`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=твой_ключ
CLERK_SECRET_KEY=твой_секретный_ключ
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
OPENAI_API_KEY=твой_ключ_OpenAI
REPLICATE_API_TOKEN=токен_Replicate
DATABASE_URL=URL_подключения_к_MongoDB
STRIPE_API_KEY=твой_Stripe_API_ключ
STRIPE_WEBHOOK_SECRET=твой_webhook_секрет
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Как Запустить 🚀

```bash
# Клонируй репозиторий
$ git clone https://github.com/your_github_name/brainwave.git

# Перейди в директорию
$ cd brainwave

# Установи зависимости
$ npm install

# <Создай .env файл и пропиши переменные>

# Синхронизация с базой данных (если локально)
$ npx prisma db push

# Запуск в режиме разработки
$ npm run dev
```

---



