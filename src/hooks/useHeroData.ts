import { useState, useEffect } from "react";
import { getMovieLogo, getMoviesList } from "@/app/api/movie";

export const useHeroData = () => {
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

  return { movies, logos, loading };
};
