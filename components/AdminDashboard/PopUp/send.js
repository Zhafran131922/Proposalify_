import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { ShareIcon } from '@heroicons/react/solid';
import Select from 'react-select';

const TujuanHalaman = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const options = [
    { value: 'john_doe', label: 'John Doe - Computer Science' },
    { value: 'jane_smith', label: 'Jane Smith - Mathematics' },
    { value: 'michael_brown', label: 'Michael Brown - Physics' },

  ];

  return (
    <ChakraProvider>
      <ShareIcon className="h-4 w-4 cursor-pointer" onClick={onOpen} />
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
            className="bg-blue-400 p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Send to Dosen</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="dosen" className="block text-sm font-medium text-white">
                  Search Dosen:
                </label>
                <Select
                  options={options}
                  id="dosen"
                  name="dosen"
                  className="mt-1"
                  classNamePrefix="react-select"
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
                  Close
                </Button>
                <Button
                  colorScheme="whiteAlpha"
                  variant="solid"
                  sx={{ bg: 'white', color: 'blue.500' }}
                >
                  Send
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
