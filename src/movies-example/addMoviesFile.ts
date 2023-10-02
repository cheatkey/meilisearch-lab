import { client } from "..";
import movies from "./movies.json" assert { type: "json" };

interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: string[];
  poster: string;
  release_date: number;
}

client
  .index("movies")
  .addDocuments(movies as Movie[])
  .then((res) => console.log(res));
