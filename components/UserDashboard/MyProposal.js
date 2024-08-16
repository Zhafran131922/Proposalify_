import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';
import { useRouter } from 'next/router';

const MyProposal = ({ userId }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [hovered, setHovered] = useState(false);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/api/proposals/saved-proposals/${userId}`);
                const proposalsData = response.data;
                const transformedProposals = proposalsData.map(proposal => ({
                    _id: proposal._id,
                    title: proposal.judul,
                    lastUpdate: new Date(), // Set to current date
                    status: "On Progress", // Update this according to your actual status
                    statusColor: "bg-blue-100 text-blue-800" // Update this according to your actual status color logic
                }));

                setProposals(transformedProposals);
            } catch (error) {
                console.error('Failed to fetch proposals:', error);
            }
        };

        fetchProposals();
    }, [userId]);

    const filteredProposals = proposals.filter(proposal =>
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSortChange = (columnName) => {
        if (columnName === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortDirection('asc');
        }
    };

    const sortedProposals = filteredProposals.sort((a, b) => {
        const order = sortDirection === 'asc' ? 1 : -1;
        switch (sortBy) {
            case 'Title':
                return order * a.title.localeCompare(b.title);
            case 'LastUpdate':
                return order * (a.lastUpdate - b.lastUpdate);
            case 'Status':
                return order * a.status.localeCompare(b.status);
            default:
                return 0;
        }
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCellClick = (id) => {
        router.push(`/proposal/${id}`);
    };

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
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm0 0v4m0 0h4m4 0a4 4 0 100 8 4 4 0 000-8zm0 0v4m0 0h4" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search Proposal"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="py-2 px-4 pl-10 border border-gray-300 rounded-full w-full"
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
                        <label className="text-gray-600">Sort by</label>
                        <motion.select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="bg-transparent border-none outline-none appearance-none cursor-pointer text-gray-600 font-bold relative"
                        >
                            <option value="Title" className="hover:bg-gray-100 p-2 cursor-pointer">Title</option>
                            <option value="LastUpdate" className="hover:bg-gray-100 p-2 cursor-pointer">Last Update</option>
                            <option value="Status" className="hover:bg-gray-100 p-2 cursor-pointer">Status</option>
                        </motion.select>
                    </div>
                </div>
            </div>
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-block',
                    marginTop: '25px',
                    marginBottom: '-20px',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <motion.div
                    whileHover="hover"
                    initial="initial"
                    animate="animate"
                    variants={{
                        initial: { rotate: 0 },
                        hover: {
                            rotate: 360,
                            transition: { duration: 1, ease: "easeInOut" },
                        },
                    }}
                >
                    <Link href="/proposal/0">
                        <Fab
                            color="primary"
                            aria-label="add"
                            style={{
                                width: '40px',
                                height: '40px',
                                boxShadow: 'none',
                                background: hovered ? 'white' : '#1A91F0',
                                borderRadius: '50%',
                            }}
                        >
                            <motion.div
                                variants={{
                                    initial: { rotate: 0 },
                                    hover: {
                                        rotate: 360,
                                        transition: { duration: 1, ease: "easeInOut" },
                                    },
                                }}
                            >
                                <AddIcon style={{ fontSize: 24, color: hovered ? '#1A91F0' : 'white' }} />
                            </motion.div>
                        </Fab>
                    </Link>
                </motion.div>
                {hovered && (
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 10, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: '0%',
                            left: 'calc(100% + 10px)',
                            transform: 'translateY(-50%)',
                            background: '#4a4a4a',
                            color: 'white',
                            borderRadius: '30px',
                            padding: '9px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            whiteSpace: 'nowrap',
                            fontSize: '14px',
                        }}
                    >
                        <AddIcon style={{ marginRight: '10px' }} />
                        New Project
                    </motion.div>
                )}
            </Box>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full bg-white">
                    <thead className="sticky top-0">
                        <tr>
                            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSortChange('Title')}>
                                    Proposal Title
                                    {sortBy === 'Title' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSortChange('LastUpdate')}>
                                    Last Update
                                    {sortBy === 'LastUpdate' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th className="py-4 px-4 bg-white text-left text-sm font-bold text-gray-600">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSortChange('Status')}>
                                    Status
                                    {sortBy === 'Status' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProposals.map((proposal, index) => (
                            <tr key={index} className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => handleCellClick(proposal._id)}>
                                <td className="py-2 px-4 text-sm text-gray-700">
                                    {proposal.title}
                                </td>
                                <td className="py-2 px-4 text-sm text-gray-700">
                                    {proposal.lastUpdate.toLocaleString()}
                                </td>
                                <td className="py-2 px-4 text-sm">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${proposal.statusColor}`}>
                                        {proposal.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default MyProposal;
