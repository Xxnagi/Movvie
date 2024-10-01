"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import { convertToUrlFormat } from "../../constants/function";
import HeroPlaceholder from "./placeholder/HeroPlaceholder";
import { Movie } from "../../constants/interface";
import { Button } from "@/components/ui/button";
import { getMovieLogo, getMoviesList } from "@/config/api";

const Hero = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [logos, setLogos] = useState<Record<number, { file_path: string }[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList("popular");
        const movieList = data.results;
        setMovies(movieList);
        const logoPromises = movieList.map(async (movie: any) => {
          const logoData = await getMovieLogo(movie.id);
          return { movieId: movie.id, logos: logoData.logos };
        });

        const logoResults = await Promise.all(logoPromises);
        const logoMap = logoResults.reduce((acc, { movieId, logos }) => {
          acc[movieId] = logos;
          return acc;
        }, {} as Record<number, { file_path: string }[]>);
        setLogos(logoMap);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: { delay: 5000 },
    className: "w-full",
  };

  return (
    <section className="flex w-full justify-center items-center">
      <div className="flex w-full relative">
        {loading ? (
          <HeroPlaceholder />
        ) : (
          <Swiper {...settings}>
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative h-[85vh] overflow-hidden bg-black">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    layout="fill"
                    className="object-cover object-top"
                    alt={movie.title}
                  />
                  <div className="absolute max-w-screen-2xl gap-5 p-5 inset-0 z-10 flex flex-col justify-center mx-auto">
                    {logos[movie.id] && logos[movie.id][0] ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/original${
                          logos[movie.id][0].file_path
                        }`}
                        width={500}
                        height={250}
                        className="object-contain"
                        alt="Movie Logo"
                      />
                    ) : (
                      <h1 className="text-4xl font-bold text-white">
                        {movie.title}
                      </h1>
                    )}

                    <p className="line-clamp-2 md:w-5/12 w-3/4 text-white">
                      {movie.overview}
                    </p>
                  </div>
                  <div className="absolute max-w-screen-2xl mx-auto p-5 inset-0 z-10 flex justify-start items-end gap-5 bottom-10">
                    <Button size={"lg"}>Watch Now</Button>
                    <Link
                      href={`/detail/${movie.id}-${convertToUrlFormat(
                        movie.title
                      )}`}
                    >
                      <Button size={"lg"} variant={"secondary"}>
                        More Info
                      </Button>
                    </Link>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Hero;
