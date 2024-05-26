import { motion } from 'framer-motion';
import React, { useState } from 'react';

const MyProposal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Recent');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Proposal</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm0 0v4m0 0h4m4 0a4 4 0 100 8 4 4 0 000-8zm0 0v4m0 0h4" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Proposal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 pl-10 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <style jsx>{`
            select {
                background-color: transparent;
                border: none;
                outline: none;
            }
            option {
                background-color: transparent;
                border: none;
                outline: none;
            }
            `}</style>
          <div className="flex flex-col items-start">
            <label className="text-gray-600 ">Sort by</label>
            <motion.select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-600 font-bold relative"
          >
            <option value="Recent" className="hover:bg-gray-100 p-2 cursor-pointer">Recent</option>
            <option value="Oldest" className="hover:bg-gray-100 p-2 cursor-pointer">Oldest</option>
            <option value="Title" className="hover:bg-gray-100 p-2 cursor-pointer">Title</option>
          </motion.select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-white">
      <thead className="sticky top-0">
        <tr>
            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
            Proposal Title
            </th>
            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
            Last Seen
            </th>
            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
            Status
            </th>
        </tr>
      </thead>
        <tbody>
          <tr className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => handleCellClick('On Progress')}>
            <td className="py-2 px-4 text-sm text-gray-700">
              Implementasi Augment Reality pada Kebudayaan Indonesia
            </td>
            <td className="py-2 px-4 text-sm text-gray-700">
              26/07/24 : 08:22 AM
            </td>
            <td className="py-2 px-4 text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                On Progress
              </span>
            </td>
          </tr>
          <tr className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => handleCellClick('On Progress')}>
            <td className="py-2 px-4 text-sm text-gray-700">
              Implementasi Augment Reality pada Kebudayaan Indonesia
            </td>
            <td className="py-2 px-4 text-sm text-gray-700">
              26/07/24 : 08:22 AM
            </td>
            <td className="py-2 px-4 text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Denied
              </span>
            </td>
          </tr>
          <tr className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => handleCellClick('On Progress')}>
            <td className="py-2 px-4 text-sm text-gray-700">
              Implementasi Augment Reality pada Kebudayaan Indonesia
            </td>
            <td className="py-2 px-4 text-sm text-gray-700">
              26/07/24 : 08:22 AM
            </td>
            <td className="py-2 px-4 text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Accepted
              </span>
            </td>
          </tr>
          <tr className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => handleCellClick('On Progress')}>
            <td className="py-2 px-4 text-sm text-gray-700">
              Implementasi Augment Reality pada Kebudayaan Indonesia
            </td>
            <td className="py-2 px-4 text-sm text-gray-700">
              26/07/24 : 08:22 AM
            </td>
            <td className="py-2 px-4 text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Sended
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </motion.div>
  );
};

export default MyProposal;
