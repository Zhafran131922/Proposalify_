import Navbar from '../components/Navbar';
import HomePageContent from '../components/HomePageContent';
import '../styles/globals.css';
import ProposalPage from '../components/ProposalPage';
import { motion } from 'framer-motion';
import UserProposal from '../components/UserProposal';

const ManualPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <UserProposal/>
    </div>
  );
};

export default ManualPage;
