import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Filter from '../components/Filter';
import MovieList from '../components/MovieList';
import AddMovie from '../components/AddMovie';
import Hero from '../components/Hero';
import '../styles/HomePage.css';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Blockbuster Verse - Home';
  }, []);

  return (
    <>
      <Hero />
      <motion.div
        className="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Filter />
        <MovieList />
        <AddMovie />
      </motion.div>
    </>
  );
};

export default HomePage;