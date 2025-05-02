import { createContext, useState, useEffect, useContext } from 'react';

// Sample initial movies data
const initialMovies = [
  {
    id: 1,
    title: "Inception",
    date: "2010-07",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterURL:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    rating: 4.8,
    trailerURL: "https://youtu.be/8hP9D6kZseM?si=gL7b0l92axjEMajU",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    date: "1994-09",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterURL:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw",
    rating: 4.9,
    trailerURL: "https://youtu.be/PLl99DlL6b4?si=93qCjgmBBKL8axo6",
  },
  {
    id: 3,
    title: "The Dark Knight",
    date: "2008-07",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    rating: 4.7,
    trailerURL: "https://youtu.be/EXeTwQWrcwY?si=yU9G7GYS0d1qK83i",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    date: "1994-10",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqzGSUVlP74iyuFujryxWBYV6yqGirkn7BFHIJXEMzS4gNI-Z2wEKZsW6dLYA9B77BgyPdg",
    rating: 4.6,
    trailerURL: "https://youtu.be/tGpTpVyI_OQ?si=tFPtdBr7qnBGotmk",
  },
  {
    id: 5,
    title: "Fight Club",
    date: "1999-10",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    posterURL:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_SpVkWXBnRsBBNbDaV8dur-3jlOi6fepmxBrYGkzDwHj-xtDGP4jySn7xvonE9lqNpBdRWg",
    rating: 4.5,
    trailerURL: "https://youtu.be/dfeUzm6KF4g?si=5M-l1ZSnfKgRFyAc",
  },
  {
    id: 6,
    title: "Forrest Gump",
    date: "1994-07",
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    posterURL:
      "https://resizing.flixster.com/hqcqFfWf1syt2OrGlbW7LDvfj9Y=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15829_v_v13_aa.jpg",
    rating: 4.7,
    trailerURL: "https://youtu.be/bLvqoHBptjg?si=Jppv2GCpSI2TITq0",
  },
];

export const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // Try to load movies from localStorage, fallback to initialMovies
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });
  
  const [filters, setFilters] = useState({
    title: '',
    rating: 0,
    date: ''
  });

  // Save movies to localStorage when the state changes
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // Add a new movie
  const addMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now(), // Simple way to generate unique IDs
    };
    setMovies([...movies, newMovie]);
  };

  // Get a movie by ID
  const getMovie = (id) => {
    return movies.find(movie => movie.id === Number(id)) || null;
  };

  // Update existing movie
  const updateMovie = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
  };

  // Delete a movie
  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  // Apply filters to movies
  const getFilteredMovies = () => {
    return movies.filter(movie => {
      // Filter by title
      const titleMatch = movie.title.toLowerCase().includes(filters.title.toLowerCase());
      
      // Filter by rating
      const ratingMatch = filters.rating === 0 || movie.rating >= filters.rating;
      
      // Filter by date
      const dateMatch = !filters.date || movie.date === filters.date;
      
      return titleMatch && ratingMatch && dateMatch;
    });
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Context value
  const value = {
    movies,
    filters,
    addMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getFilteredMovies,
    updateFilters
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};