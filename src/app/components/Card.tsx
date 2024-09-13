import Image from "next/image";
import Link from "next/link";
import { convertToUrlFormat } from "../constants/function";
// Import fungsi untuk slug

const Card = ({ movie }: { movie: any }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const slug = convertToUrlFormat(movie.title);

  return (
    <Link href={`/detail/${movie.id}-${slug}`}>
      <div className="cursor-pointer md:w-56 w-40 rounded-md overflow-hidden hover:scale-110 ">
        <div className="relative aspect-[2/3]">
          <Image
            src={imageUrl}
            alt="poster"
            className="bg-cover w-full overflow-hidden rounded-md"
            width={1920}
            height={1080}
          />
        </div>

        <div className="p-2">
          <h2 className="text-lg font-bold line-clamp-1">{movie.title}</h2>
          <p className="text-xs">
            <span></span>
            {movie.vote_average}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
