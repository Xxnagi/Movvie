"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../app/app.css";
import Card from "./Card";
import ListPlaceholder from "../placeholder/List";
import { convertType } from "../../constants/function";
import { useMovieList } from "@/hooks/useMovieList";
import { Navigation } from "swiper/modules";

const List = ({ category }: { category: string }) => {
  const { movies, loading } = useMovieList(
    category as "now_playing" | "popular" | "top_rated" | "upcoming"
  );

  // Corrected settings object
  const settings = {
    modules: [Navigation],
    slidesPerView: "auto" as const, // Use 'as const' to ensure TypeScript understands it's a literal type
  };

  return (
    <section className="p-5 flex justify-center items-center relative">
      <div className="max-w-screen-2xl w-full flex flex-col">
        <h1 className="text-2xl mb-3">{convertType(category)}</h1>
        <div className="relative p-3">
          {loading ? (
            <ListPlaceholder />
          ) : (
            <Swiper {...settings}>
              {movies.map((movie) => (
                <SwiperSlide key={movie.id} className="px-2 w-auto">
                  <Card movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default List;
