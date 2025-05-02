import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useMovies } from '../context/MovieContext';
import '../styles/AddMovie.css';

const initialFormState = {
  title: '',
  date: '',
  description: '',
  posterURL: '',
  rating: 0,
  trailerURL: ''
};

const AddMovie = () => {
  const { addMovie } = useMovies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Release date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.posterURL.trim()) newErrors.posterURL = 'Poster URL is required';
    if (formData.rating <= 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    if (!formData.trailerURL.trim()) newErrors.trailerURL = 'Trailer URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the trailer URL to ensure it's in embed format
      let trailerURL = formData.trailerURL;
      
      // Convert YouTube watch URLs to embed URLs
      if (trailerURL.includes('youtube.com/watch?v=')) {
        const videoId = trailerURL.split('v=')[1]?.split('&')[0];
        if (videoId) {
          trailerURL = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      // Add the movie
      addMovie({
        ...formData,
        trailerURL
      });
      
      // Reset form and close modal
      setFormData(initialFormState);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <>
      <motion.button
        className="add-movie-button"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="add-icon" />
        Add Movie
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="modal-header">
                <h2>Add New Movie</h2>
                <button className="close-button" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="add-movie-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <span className="error">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="date">Release Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && <span className="error">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="posterURL">Poster URL</label>
                  <input
                    type="url"
                    id="posterURL"
                    name="posterURL"
                    value={formData.posterURL}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.posterURL && <span className="error">{errors.posterURL}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="rating">Rating (0-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="5"
                  />
                  {errors.rating && <span className="error">{errors.rating}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="trailerURL">Trailer URL (YouTube)</label>
                  <input
                    type="url"
                    id="trailerURL"
                    name="trailerURL"
                    value={formData.trailerURL}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=example"
                  />
                  <small className="hint">YouTube watch or embed URL</small>
                  {errors.trailerURL && <span className="error">{errors.trailerURL}</span>}
                </div>

                <button type="submit" className="submit-button">Add Movie</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddMovie;