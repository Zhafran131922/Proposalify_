import Navbar from "../../components/Navbar";
import "../../styles/globals.css";
import ManualProposalPage from "../../components/Proposal/ManualProposalPage";
import { motion } from "framer-motion";

const ManualPage = ({id}:any) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 100 }} // Animasi awal: tidak terlihat dan bergeser ke bawah sejauh 100 piksel
        animate={{ opacity: 1, y: 0 }} // Animasi selama: menjadi terlihat dan kembali ke posisi awal
        transition={{ type: "spring", stiffness: 120, damping: 10 }} // Jenis animasi: spring dengan kekakuan dan redaman tertentu
      >
        <ManualProposalPage proposalId={id}/>
      </motion.div>
    </div>
  );
};

export default ManualPage;
