import { useState } from 'react';
import { FaSearch, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useMovies } from '../context/MovieContext';
import '../styles/Filter.css';

const Filter = () => {
  const { filters, updateFilters } = useMovies();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...localFilters, rating: Number(rating) };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      title: '',
      rating: 0,
      date: ''
    };
    setLocalFilters(resetValues);
    updateFilters(resetValues);
  };

  return (
    <motion.div 
      className="filter-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="filter">
        <div className="filter-group">
          <label htmlFor="title" className="filter-label">
            <FaSearch className="filter-icon" />
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={localFilters.title}
            onChange={handleChange}
            placeholder="Search by title..."
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <FaStar className="filter-icon" />
            Rating
          </label>
          <div className="rating-filter">
            <select
              name="rating"
              value={localFilters.rating}
              onChange={(e) => handleRatingChange(e.target.value)}
              className="filter-select"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3.5">3.5+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="date" className="filter-label">
            <FaCalendarAlt className="filter-icon" />
            Release Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={localFilters.date}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <button onClick={resetFilters} className="reset-button">
          Reset Filters
        </button>
      </div>
    </motion.div>
  );
};

export default Filter;