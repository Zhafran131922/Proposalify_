<<<<<<< HEAD
import Navbar from '../components/Navbar';
=======
import Navbar from "../components/Navbar";
>>>>>>> 00d7741e321f8bf3294a6a1fe9a32fe56bea65a2
import HomePageContent from '../components/HomePageContent';
import '../styles/globals.css';
import ProposalPage from '../components/ProposalPage';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 100 }} // Animasi awal: tidak terlihat dan bergeser ke bawah sejauh 100 piksel
        animate={{ opacity: 1, y: 0 }} // Animasi selama: menjadi terlihat dan kembali ke posisi awal
        transition={{ type: 'spring', stiffness: 120, damping: 10 }} // Jenis animasi: spring dengan kekakuan dan redaman tertentu
      >
        <ProposalPage />
      </motion.div>
    </div>
  );
};

export default HomePage;
