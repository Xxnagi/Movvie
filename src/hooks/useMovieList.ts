import { useState, useEffect } from "react";
import { getMoviesList } from "@/app/api/movie";

export const useMovieList = (
  category: "now_playing" | "popular" | "top_rated" | "upcoming"
) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList(category);
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

  return { movies, loading };
};
