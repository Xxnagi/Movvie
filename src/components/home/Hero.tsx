"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { convertToUrlFormat } from "../../constants/function";
import HeroPlaceholder from "../placeholder/HeroPlaceholder";
import { Button } from "@/components/ui/button";
import { useHeroData } from "@/hooks/useHeroData";
import { Autoplay } from "swiper/modules";

const Hero = () => {
  const { movies, logos, loading } = useHeroData();

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
                    fill
                    priority
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
                      href={`/movie/${movie.id}-${convertToUrlFormat(
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
