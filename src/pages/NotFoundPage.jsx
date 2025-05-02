import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="not-found-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="home-link">Back to Home</Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;