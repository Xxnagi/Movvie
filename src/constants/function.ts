export function convertToUrlFormat(title: string): string {
  title = title.trim();
  title = title.replace(/[-:.]/g, "");
  title = title.replace(/\s+/g, "-");
  title = title.toLowerCase();

  return title;
}

export function convertType(title: string): string {
  switch (title) {
    case "now_playing":
      return "Now Playing";
    case "popular":
      return "Popular";
    case "top_rated":
      return "Top Rated";
    case "upcoming":
      return "Upcoming";
    default:
      return title;
  }
}

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export const heroSettings = {
  modules: ["Autoplay"],
  loop: true,
  slidesPerView: 1,
  pagination: { clickable: true },
  autoplay: { delay: 5000 },
  className: "w-full",
};
