import { motion } from 'framer-motion';
import { useMovies } from '../context/MovieContext';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const MovieList = () => {
  const { getFilteredMovies } = useMovies();
  const filteredMovies = getFilteredMovies();

  if (filteredMovies.length === 0) {
    return (
      <div className="no-results">
        <h3>No movies found</h3>
        <p>Try adjusting your filters or add a new movie.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="movie-list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredMovies.map(movie => (
        <div key={movie.id} className="movie-list-item">
          <MovieCard movie={movie} />
        </div>
      ))}
    </motion.div>
  );
};

export default MovieList;