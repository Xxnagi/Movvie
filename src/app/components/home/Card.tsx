import Image from "next/image";
import Link from "next/link";
import { convertToUrlFormat } from "../../../constants/function";
import { MovieCard } from "../../../constants/interface";

const Card = ({ movie }: { movie: MovieCard }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const slug = convertToUrlFormat(movie.title);

  return (
    <Link href={`/movie/${movie.id}-${slug}`}>
      <div className="cursor-pointer md:w-56 w-40 rounded-md overflow-hidden transition-transform duration-300 ease-out hover:scale-105 hover:shadow-lg">
        <div className="relative aspect-[2/3] rounded-md">
          <Image
            src={imageUrl}
            alt="poster"
            className="object-cover w-full h-full transition-transform duration-300 ease-out hover:scale-105"
            width={1920}
            height={1080}
          />
        </div>

        <div className="p-2">
          <h2 className="text-lg font-bold line-clamp-1">{movie.title}</h2>
          <p className="text-xs text-gray-500">
            Rating: <span className="font-semibold">{movie.vote_average}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
