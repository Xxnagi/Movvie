import { MovieCategory } from "./type";

// type.ts
export interface ButtonProps {
  text: string;
  type?: "primary" | "secondary";
}

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  logos?: { file_path: string }[];
}

export interface ListProps {
  category: MovieCategory; // Use the defined type here
}
