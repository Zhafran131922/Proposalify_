import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';



const HomePageContent = () => {
  const [text, setText] = useState('');
  const [sentences, setSentences] = useState([
    'Selamat Datang di Proposalify',
    'Dapatkan kemudahan untuk membuat proposal ',
    'Proposal anda akan di review dosen',
  ]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentSentenceIndex + 1) % sentences.length;
      setCurrentSentenceIndex(newIndex);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentSentenceIndex, sentences]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < sentences[currentSentenceIndex].length) {
        setText(sentences[currentSentenceIndex].substring(0, currentIndex + 1));
        currentIndex++;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentSentenceIndex, sentences]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.h1
        className="text-4xl font-bold mt-20 font-nunito"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {text}
      </motion.h1>
      <p className="text-lg mb-8 mt-10 font-nunito">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/manualproposal">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buat Proposal
        </motion.button>
      </Link>
      <motion.img 
          src="/proposal.jpg" 
          alt="Proposal" 
          style={{ width: '50%', height: 'auto', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} 
          className="mt-20 mb-0"
          initial={{ opacity: 0, y: -50 }} // animasi awal: opasitas 0 dan translasi -50px ke atas
          animate={{ opacity: 1, y: 0, transition: { duration: 5, type: 'spring', bounce: 0.5 } }}

        />
    </div>
  );
};

export default HomePageContent;
