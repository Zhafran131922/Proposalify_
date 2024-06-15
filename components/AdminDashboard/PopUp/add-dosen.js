import { useState } from 'react';
import { motion } from 'framer-motion';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Button, ChakraProvider } from '@chakra-ui/react';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const TujuanHalaman = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <ChakraProvider>
      <Button colorScheme="blue" onClick={onOpen} leftIcon={<AddCircleOutlinedIcon />}>
        Add Dosen
      </Button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Tambah Akun Dosen</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email Dosen:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label htmlFor="bidang" className="block text-sm font-medium text-white mt-4">
                  Bidang Keahlian:
                </label>
                <input
                  type="bidang"
                  name="bidang"
                  id="bidang"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>           
              <div className="flex justify-end">
                <Button
                  colorScheme="whiteAlpha"
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Tutup
                </Button>
                <Button
                  colorScheme="whiteAlpha"
                  variant="solid"
                  sx={{ bg: 'white', color: 'blue.500' }}
                >
                  Tambah
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </ChakraProvider>
  );
};

export default TujuanHalaman;
