import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "c1262193488dbfbfc4f91af75a0f3ddc";

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(
    `${baseUrl}/movie/${movieId}?language=en-US&api_key=${apiKey}`
  );
  return response.data;
};

export const getMovieLogo = async (movieId: string) => {
  const response = await axios.get(
    `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}&language=en-US&include_image_language=null,en,fr,pt,de`
  );
  return response.data;
};

export const getMoviesList = async (
  category: "now_playing" | "popular" | "top_rated" | "upcoming",
  page = 1
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${category}?language=en-US&page=${page}&api_key=${apiKey}`
    );
    const movies = response.data.results;

    // Fetch logos for all movies
    const movieLogoPromises = movies.map((movie: any) =>
      getMovieLogo(movie.id)
    );
    const movieLogoResponses = await Promise.all(movieLogoPromises);

    // Combine movies with their logos
    const moviesWithLogos = movies.map((movie: any, index: number) => ({
      ...movie,
      logos: movieLogoResponses[index].logos,
    }));

    return {
      ...response.data,
      results: moviesWithLogos,
    };
  } catch (error) {
    console.error(`Error fetching ${category} movies with logos:`, error);
    throw error;
  }
};
