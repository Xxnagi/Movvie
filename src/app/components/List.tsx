"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
// Import the ListPlaceholder component
import { getMoviesList } from "../config/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListPlaceholder from "./placeholder/List";
import { ListProps } from "../constants/interface";
import { convertType } from "../constants/function";

const List = ({ category }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList(category);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true, // Let the card width be determined by its content
    arrows: true,
  };

  return (
    <section className="p-5 flex justify-center items-center relative">
      <div className="max-w-screen-2xl w-full flex flex-col">
        <h1 className="text-2xl mb-3">{convertType(category)}</h1>
        <div className="relative w-full p-3 overflow-visible">
          {loading ? (
            <ListPlaceholder />
          ) : (
            <Slider {...settings}>
              {movies.map((movie) => (
                <div key={movie.id} className="inline-block w-full w-auto px-2">
                  <Card movie={movie} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default List;
