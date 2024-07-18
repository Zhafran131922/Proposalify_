import { motion } from 'framer-motion';
import Image from 'next/image';
import proposal from '../../images/proposal.svg';
import proposalActive from '../../images/proposal-active.png';
import revision from '../../images/revision.svg';
import revisiActive from '../../images/revisi-active.svg';
import tracking from '../../images/tracking.svg';
import trackingActive from '../../images/tracking-active.png';
import revisi from '../../images/revisi.svg';
const Sidebar = ({ setActiveComponent, activeComponent }) => {
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-gray-900 w-64 h-screen top-24 left-0 overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          <motion.li
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1, duration: 0.5 }}
            variants={textVariants}
          >
            <a
              onClick={() => setActiveComponent('ListProposal')}
              className={`cursor-pointer text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg block transition duration-200 flex items-center ${
                activeComponent === 'ListProposal' ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <Image
                src={activeComponent === 'ListProposal' ? proposalActive : proposal}
                alt="My Proposal Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span>Daftar Proposal</span>
            </a>
          </motion.li>
          <motion.li
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={textVariants}
          >
            <a
              onClick={() => setActiveComponent('Revisi')}
              className={`cursor-pointer text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg block transition duration-200 flex items-center ${
                activeComponent === 'Revisi' ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <Image
                src={activeComponent === 'Revisi' ? revisiActive : revisi}
                alt="Revisi Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span>Revisi</span>
            </a>
          </motion.li>
        </ul>
      </div>
    </div>
  );
  
};

export default Sidebar;
