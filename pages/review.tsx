import Navbar from '../components/Navbar';
import ReviewPage from '../components/ReviewPage';
import '../styles/globals.css';

const Review= () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ReviewPage />
    </div>
  );
};

export default Review;