import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
