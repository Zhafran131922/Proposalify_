import { motion } from 'framer-motion';
import Image from 'next/image';
import proposal from '../../images/proposal.svg';
import proposalActive from '../../images/proposal-active.png';
import Dosen from '../../images/revision.svg';
import DosenActive from '../../images/revision-active.png';
import Rekapitulasi from '../../images/tracking.svg';
import RekapitulasiActive from '../../images/tracking-active.png';

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  const user = {
    name : localStorage.getItem('name'),
    token : localStorage.getItem('token'),
    email : localStorage.getItem('email'),
  }

  return (
    <div className="bg-gray-900 w-64 h-screen top-24 left-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-white text-lg font-semibold mb-4">Hi, {user.name}</h2>
        <ul className="space-y-2">
          <motion.li
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1, duration: 0.5 }}
            variants={textVariants}
          >
            <a
              onClick={() => setActiveComponent('MyProposal')}
              className={`cursor-pointer text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg block transition duration-200 flex items-center ${
                activeComponent === 'MyProposal' ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <Image
                src={activeComponent === 'MyProposal' ? proposalActive : proposal}
                alt="My Proposal Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span>Proposal</span>
            </a>
          </motion.li>
          <motion.li
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={textVariants}
          >
            <a
              onClick={() => setActiveComponent('Dosen')}
              className={`cursor-pointer text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg block transition duration-200 flex items-center ${
                activeComponent === 'Dosen' ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <Image
                src={activeComponent === 'Dosen' ? DosenActive : Dosen}
                alt="My Dosen Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span>Dosen</span>
            </a>
          </motion.li>
          <motion.li
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={textVariants}
          >
            <a
              onClick={() => setActiveComponent('Rekapitulasi')}
              className={`cursor-pointer text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg block transition duration-200 flex items-center ${
                activeComponent === 'Rekapitulasi' ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <Image
                src={activeComponent === 'Rekapitulasi' ? RekapitulasiActive : Rekapitulasi}
                alt="My Rekapitulasi Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span>Rekapitulasi</span>
            </a>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
