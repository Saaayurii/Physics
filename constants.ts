import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
];

import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "./public/assets";

export const navigation = [
  {
    id: "0",
    title: "Функции",
    url: "#features",
  },
  {
    id: "1",
    title: "Генерировать",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Как использовать",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Дорожная карта",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Новая учетная запись",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Войти",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Тело массой 2 кг движется с ускорением 5 м/с²",
  "Найти силу",
  "F = 10 Н (Ньютон)",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Распознавание голоса",
    text: "Позвольте чат-боту понять и отвечать на голосовые команды, что облегчает взаимодействие с приложением с помощью приложения.",
    date: "Май 2025",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Геймификация",
    text: "Добавьте игровые элементы, такие как значки или таблицы лидеров, чтобы побудить пользователей чаще взаимодействовать с чат-ботом.",
    date: "Май 2025",
    status: "progress",
    imageUrl: roadmap2,
    colorful: true,
  },
  {
    id: "2",
    title: "Настройка чат-бота",
    text: "Позвольте пользователям настраивать внешний вид и поведение чат-бота, что делает его более привлекательным и веселым взаимодействием.",
    date: "Май 2025",
    status: "done",
    imageUrl: roadmap3,
    colorful: true,
  },
  {
    id: "3",
    title: "Интеграция с APIs",
    text: "Позвольте чат-боту получить доступ к внешним источникам данных, таким как погодные API или новости API, чтобы предоставить более актуальные рекомендации.",
    date: "Май 2025",
    status: "progress",
    imageUrl: roadmap4,
    colorful: true,
  },
];

export const collabText =
  "Система автоматически создает программные решения без участия программиста — достаточно описать задачу на понятном языке.";

export const collabContent = [
  {
    id: "0",
    title: "Интеграция предметных областей",
    text: collabText,
  },
  {
    id: "1",
    title: "Автоматическая генерация кода",
  },
  {
    id: "2",
    title: "Надежность и проверяемость",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "📐 Геометрия",
    description: "Автоматическое решение задач по геометрическим фигурам",
    price: "Бесплатно",
    features: [
      "Рассчёт площадей и периметров фигур (треугольник, круг, трапеция и др.)",
      "Пошаговое объяснение формул и вычислений",
      "Визуализация: схемы, подписи, формулы",
    ],
  },
  {
    id: "1",
    title: "⚙️ Физика (движение)",
    description: "Решение задач по законам движения и механике",
    price: "Бесплатно",
    features: [
      "Автоматический расчёт по второму закону Ньютона и другим формулам",
      "Понимание текстового ввода: «Тело массой 2 кг движется с ускорением…»",
      "Пошаговое решение с подстановкой значений и единицами измерения",
    ],
  },
  {
    id: "2",
    title: "🔌 Электро цепи",
    description: "Решение задач по законам Ома и Кирхгофа",
    price: "Бесплатно",
    features: [
      "Поддержка расчётов силы тока, напряжения и сопротивления",
      "Анализ разветвлённых цепей (закон Кирхгофа)",
      "Расчёт мощности, преобразование единиц, схемы",
    ],
  },
];


export const benefits = [
  {
    id: "0",
    title: "Понимание спецификаций",
    text: "Анализирует непроцедурные описания задач и преобразует их в внутренние представления с необходимостью описания шагов вручную.",
    backgroundUrl: "/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Синтез программ",
    text: "Автоматически создает программный код на основе формализованных требований, используя метод структурного синтеза.",
    backgroundUrl: "/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Визуализация решений",
    text: "Отображает полученные результаты в виде файлов и ответов на сайте. Поддерживается визуализация данных по геометрии, физике и схемам.",
    backgroundUrl: "/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Механика (движение)",
    text: "Решает задачи по кинематике: вычисляет путь, скорость, ускорение и время по исходным параметрам.",
    backgroundUrl: "/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Геометрические задачи",
    text: "Работает с различными фигурами: треугольники, круги, прямоугольники. Автоматически рассчитывает площади, углы и другие параметры.",
    backgroundUrl: "/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Электрические цепи",
    text: "Моделирует и анализирует простые электрические схемы, рассчитывая ток, напряжение и сопротивление по законам электротехники.",
    backgroundUrl: "/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
