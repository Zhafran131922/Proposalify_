import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";

const HomePageContent = () => {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState([
    "Selamat Datang di Proposalify",
    "Dapatkan kemudahan untuk membuat proposal ",
    "Proposal anda akan di review dosen",
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
      <p className="text-lg mb-8 mt-10 font-nunito">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
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
        src="/landing.png"
        alt="Proposal"
        style={{
          width: "50%",
          height: "auto",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        className="mt-20 mb-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 5, type: "spring", bounce: 0.5 },
        }}
      />

      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-bold mb-6">Pay once, use forever</h2>
        <div className="flex items-center space-x-6">
          <div className="bg-gray-800 text-white p-6 h-400 w-300 rounded-lg shadow-lg py-4">
            <h3 className="text-xl text-orange-500 font-semibold mb-4">
              Basic
            </h3>
            <p className="mt-2 mb-4">
              AI chatbot, personalized recommendations
            </p>
            <p className="text-5xl font-bold">$0</p>
            <ul className="mb-4 mt-4">
              <li>✔ An AI chatbot that can understand your queries</li>
              <li>✔ Personalized recommendations based on your preferences</li>
              <li>
                ✔ Ability to explore the app and its features without any cost
              </li>
            </ul>
            <Button
              color="blue" // Choose your desired color (e.g., blue)
              className="mt-4" // Add any additional styling classes
            >
              Get Started
            </Button>
          </div>

          <div className="bg-gray-800 text-white p-6 h-500 w-400 rounded-lg shadow-lg py-12">
            <h3 className="text-xl text-green-200 font-semibold mb-4">
              Premium
            </h3>
            <p className="mt-2 mb-4">
              Advanced AI chatbot, priority support, analytics dashboard
            </p>
            <p className="text-5xl font-bold">$9.99</p>
            <ul className="mb-4 mt-4">
              <li>
                ✔ An advanced AI chatbot that can understand complex queries
              </li>
              <li>✔ An analytics dashboard to track your conversations</li>
              <li>✔ Priority support to solve issues quickly</li>
            </ul>
            <Button />
          </div>

          <div className="bg-gray-800 text-white p-6 h-400 w-300 rounded-lg shadow-lg py-4">
            <h3 className="text-xl text-indigo-400 font-semibold mb-4">
              Enterprise
            </h3>
            <p className="mt-2 mb-4">
              Custom AI chatbot, advanced analytics, dedicated account
            </p>
            <ul className="mb-4">
              <li>✔ An AI chatbot that can understand your queries</li>
              <li>✔ Personalized recommendations based on your preferences</li>
              <li>
                ✔ Ability to explore the app and its features without any cost
              </li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageContent;
