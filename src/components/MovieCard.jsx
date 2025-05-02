import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, date, posterURL, rating } = movie;
  
  // Format the date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <motion.div 
      className="movie-card"
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/movie/${id}`} className="movie-card-link">
        <div className="movie-card-poster">
          <img src={posterURL} alt={title} />
          <div className="movie-card-overlay">
            <div className="movie-card-info">
              <h3 className="movie-card-title">{title}</h3>
              <p className="movie-card-date">{formattedDate}</p>
              <div className="movie-card-rating">
                <FaStar className="star-icon" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;