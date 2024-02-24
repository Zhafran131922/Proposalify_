import Navbar from '../components/Navbar';
import HomePageContent from '../components/HomePageContent';
import '../styles/globals.css';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <HomePageContent />
    </div>
  );
};

export default HomePage;
