"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "./Card";

import ListPlaceholder from "../placeholder/List";
import { convertType } from "../../../constants/function";
import "../../app.css";
import { getMoviesList } from "@/app/api/movie";

const List = ({ category }: { category: string }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList(
          category as "now_playing" | "popular" | "top_rated" | "upcoming"
        );
        setMovies(
          data.results.map((movie: any) => ({
            id: movie.id,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            title: movie.title,
          }))
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const settings = {
    modules: [Navigation],
    slidesPerView: "auto", // Fixed this line

    navigation: true,
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
