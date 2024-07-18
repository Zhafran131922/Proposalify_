import Navbar from '../components/Navbar';
import HomePageContent from '../components/LandingPage/HomePageContent';
import '../styles/globals.css';
import ImageSlider from "../components/LandingPage/Image";
import Gambar1 from "../../images/propo1.jpg";
import Gambar2 from "../../images/propo2.jpg";
import Gambar3 from "../../images/propo3.jpg";

const HomePage = () => {
  const mainImageSizes = [
    { width: "600px", height: "800px" },
    { width: "500px", height: "700px" },
    { width: "550px", height: "750px" },
  ];

  const sideImageSizes = [
    { width: "150px", height: "200px" },
    { width: "130px", height: "180px" },
    { width: "140px", height: "190px" },
  ];
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <HomePageContent />
      
    </div>
  );
};

export default HomePage;
