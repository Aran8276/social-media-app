import { ShortsCardType } from "./ShortsCard";
import { SidebarNavLinksType } from "./SidebarNavLinks";
import { Cog, Film, MonitorPlay, Rss, Users } from "lucide-react";

export const sidebarNavLinks: SidebarNavLinksType[] = [
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
