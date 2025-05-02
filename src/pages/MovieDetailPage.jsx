import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { useMovies } from '../context/MovieContext';
import '../styles/MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovie } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [youtubeId, setYoutubeId] = useState('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    try {
      const foundMovie = getMovie(id);
      
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Extract YouTube video ID from embed URL
        const url = new URL(foundMovie.trailerURL);
        const pathname = url.pathname;
        if (pathname.includes('/embed/')) {
          setYoutubeId(pathname.split('/embed/')[1]);
        }
        
        // Set page title
        document.title = `${foundMovie.title} - Blockbuster Verse`;
      } else {
        setError('Movie not found');
      }
    } catch (err) {
      setError('Error loading movie');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, getMovie]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>{error || 'Movie not found'}</h2>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            <FaArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <motion.div 
      className="movie-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="movie-detail-backdrop" style={{ backgroundImage: `url(${movie.posterURL})` }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-detail-content">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft /> Back to Home
        </button>
        
        <div className="movie-detail-grid">
          <motion.div 
            className="movie-poster-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
          </motion.div>
          
          <motion.div 
            className="movie-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="movie-title">{movie.title}</h1>
            
            <div className="movie-meta">
              <div className="meta-item">
                <FaStar className="meta-icon star" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{new Date(movie.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}</span>
              </div>
            </div>
            
            <div className="movie-description">
              <h3>Overview</h3>
              <p>{movie.description}</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="movie-trailer-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>Trailer</h2>
          <div className="trailer-container">
            {youtubeId ? (
              <YouTube 
                videoId={youtubeId} 
                opts={opts} 
                className="trailer-player" 
              />
            ) : (
              <div className="trailer-fallback">
                <p>Trailer not available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;