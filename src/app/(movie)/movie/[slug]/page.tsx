"use client";
import Loader from "@/app/components/Loader";
import { getMovieDetails } from "@/app/api/movie";

import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieDetailParams {
  params: {
    slug: string;
  };
}

export default function MovieDetail({ params: { slug } }: MovieDetailParams) {
  // Split the slug to get the movie ID
  const movieId = slug.split("-")[0];
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State to track the loading status

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Show the Loader while loading
  if (loading) {
    return <Loader />;
  }
  const imageUrl = `https://image.tmdb.org/t/p/original${movieData.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

  return (
    <section className="relative w-full h-screen flex justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm"></div>
      </div>

      <div className="relative flex flex-col sm:flex-row max-w-screen-2xl gap-5 z-10 p-5 pt-32">
        <div className="sm:w-96 w-64">
          <Image
            src={imageUrl}
            width={1080}
            height={1920}
            alt="movie"
            className="basis-1/4 rounded-md"
          />
        </div>

        <div className="basis-3/4 w-full text-white">
          <h1 className="text-5xl font-bold">{movieData.title}</h1>
          <p className="text-md mt-6">{movieData.overview}</p>
        </div>
      </div>
    </section>
  );
}
