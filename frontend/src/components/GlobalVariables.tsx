import { ShortsCardType } from "./ShortsCard";
import { SidebarNavLinksType } from "./SidebarNavLinks";
import {
  Cog,
  Film,
  LogIn,
  LogOut,
  MonitorPlay,
  Rss,
  Users,
} from "lucide-react";

const sidebarNavLinks: SidebarNavLinksType[] = [
  {
    children: "Feed",
    icon: <Rss className="scale-[1.10]" />,
    href: "/feed",
  },
  {
    children: "Shorts",
    icon: <Film className="scale-[1.10]" />,
    href: "/shorts",
  },
  {
    children: "Teman",
    icon: <Users className="scale-[1.10]" />,
    href: "/friends",
  },
  {
    children: "Media",
    icon: <MonitorPlay className="scale-[1.10]" />,
    href: "/media",
  },
  {
    children: "Setelan",
    icon: <Cog className="scale-[1.10]" />,
    href: "/settings",
  },
];

export const getSidebarNavLinks = (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return [
      ...sidebarNavLinks,
      {
        children: "Logout",
        icon: <LogOut />,
        href: "/logout",
      },
    ];
  }
  return [
    ...sidebarNavLinks,
    {
      children: "Login",
      icon: <LogIn />,
      href: "/login",
    },
  ];
};

export const shortVideos: ShortsCardType[] = [
  {
    title: "Amazing Sunset",
    name: "NatureLover",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Cooking Tips",
    name: "ChefMaster",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Funny Cat",
    name: "PetVideos",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Travel Vlog",
    name: "Wanderlust",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Tech Review",
    name: "GadgetGuru",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Fitness Routine",
    name: "FitLife",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "DIY Crafts",
    name: "CreativeHands",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Gaming Highlights",
    name: "ProGamer",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Music Cover",
    name: "MelodyMaker",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Dance Moves",
    name: "DanceStar",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Art Tutorial",
    name: "ArtisticSoul",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Science Experiment",
    name: "ScienceGeek",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Motivational Speech",
    name: "InspireMe",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Fashion Tips",
    name: "StyleIcon",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Car Review",
    name: "AutoExpert",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "History Facts",
    name: "HistoryBuff",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Book Review",
    name: "BookWorm",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Life Hacks",
    name: "SmartLiving",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Comedy Skit",
    name: "LaughOutLoud",
    src: "https://via.placeholder.com/200x300",
  },
  {
    title: "Magic Tricks",
    name: "MagicMan",
    src: "https://via.placeholder.com/200x300",
  },
];

export const colorList = [
  "bg-slate-100",
  "bg-gray-100",
  "bg-zinc-100",
  "bg-neutral-100",
  "bg-stone-100",
  "bg-red-100",
  "bg-orange-100",
  "bg-amber-100",
  "bg-yellow-100",
  "bg-lime-100",
  "bg-green-100",
  "bg-emerald-100",
  "bg-teal-100",
  "bg-cyan-100",
  "bg-sky-100",
  "bg-blue-100",
  "bg-indigo-100",
  "bg-violet-100",
  "bg-purple-100",
  "bg-fuchsia-100",
  "bg-pink-100",
  "bg-rose-100",
];

export const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_BASE_URL;

export const timeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }
  return "just now";
};

export const excludedLayoutList = ["/login", "/register"];

export const storage = window.localStorage;
export const jwtKeyName = "jwt_token";
export const jwtToken = storage.getItem(jwtKeyName);
export const removeJwtToken = () => {
  storage.removeItem(jwtKeyName);
};
export const setJwtToken = (token: string) => {
  storage.setItem(jwtKeyName, token);
};
export const getJwtToken = () => {
  if (jwtToken) {
    return jwtToken;
  }
  return "";
};

export const requestHeader = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getJwtToken()}`,
  },
};
