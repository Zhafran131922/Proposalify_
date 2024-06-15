import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/solid';

const messages = [
  {
    id: 1,
    sender: 'flashcar',
    senderName: 'Dr. Vitradesie Noekent SE MM',
    subject: 'Exciting News About Your Proposal Result 🎉',
    preview: 'We have some exciting news to share with you...',
    date: '2 Mins',
    content: `
      Hi! Good Evening

      Dear Dika Irwansyah,

      We hope this email finds you well and in great spirits! At Flash Car, we're thrilled to share some exciting news with our valued customers.

      Get ready for an adrenaline-pumping adventure like never before! We're hosting an exclusive event that promises to redefine your driving experience. Whether you're a car enthusiast or just love the thrill of the road, this event is tailor-made for you.

      What to Expect:
      - Unveiling of Latest Models: Be the first to witness the launch of our newest and most innovative car models.
      - Test Drives: Experience the power and performance of Flash Car firsthand with test drives available throughout the event.
      - Interactive Workshops: Learn from experts about the latest advancements in automotive technology and get insider tips on car maintenance.
      - Exclusive Discounts: Take advantage of special event-only discounts on selected Flash Car models.

      Save the Date: January 8, 2024
      Time: 10:00 AM
      Venue: Flash Car Showroom, 123 Drive Avenue, Cityville

      Thank you for the invite! Excited to confirm my attendance on January 8, 2024, at 10:00 AM. Can't wait for the latest models, test drives, and exclusive discounts.

      Best, Dika Irwansyah
    `,
  },
  {
    id: 2,
    sender: 'badingatus',
    senderName: 'Badingatus Solikhah, S.E., M.Si.',
    subject: 'Exciting News About Your Proposal Result 🎉',
    preview: 'We have some exciting news to share with you...',
    date: '2 Mins',
    content: `
      Hi! Good Evening

      Dear Dika Irwansyah,

      We hope this email finds you well and in great spirits! At Flash Car, we're thrilled to share some exciting news with our valued customers.

      Get ready for an adrenaline-pumping adventure like never before! We're hosting an exclusive event that promises to redefine your driving experience. Whether you're a car enthusiast or just love the thrill of the road, this event is tailor-made for you.

      What to Expect:
      - Unveiling of Latest Models: Be the first to witness the launch of our newest and most innovative car models.
      - Test Drives: Experience the power and performance of Flash Car firsthand with test drives available throughout the event.
      - Interactive Workshops: Learn from experts about the latest advancements in automotive technology and get insider tips on car maintenance.
      - Exclusive Discounts: Take advantage of special event-only discounts on selected Flash Car models.

      Save the Date: January 8, 2024
      Time: 10:00 AM
      Venue: Flash Car Showroom, 123 Drive Avenue, Cityville

      Thank you for the invite! Excited to confirm my attendance on January 8, 2024, at 10:00 AM. Can't wait for the latest models, test drives, and exclusive discounts.

      Best, Dika Irwansyah
    `,
  },
];


const Revision = () => {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  const messageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex h-screen">
  
      <div className="bg-gray-100 w-1/4 border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          <ul className="space-y-2">
            {messages.map((message) => (
              <motion.li
                key={message.id}
                initial="hidden"
                animate="visible"
                variants={messageVariants}
                className={`p-4 cursor-pointer rounded-lg transition duration-200 ${
                  selectedMessage.id === message.id ? 'bg-gray-300' : 'bg-gray-200'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{message.senderName}</span>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
                <p className="text-sm text-gray-700">{message.subject}</p>
                <p className="text-xs text-gray-500">{message.preview}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

  
      <div className="bg-white w-3/4 p-8 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">{selectedMessage.subject}</h2>
          <p className="text-gray-500">{selectedMessage.date}</p>
        </div>
        <div className="flex items-center mb-8">
          <UserIcon className="h-10 w-10 text-gray-500 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold">{selectedMessage.senderName}</h3>
            <p className="text-gray-500">{`${selectedMessage.sender}@soramaail.io`}</p>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={messageVariants}
        >
          <pre className="whitespace-pre-wrap text-gray-800 text-justify">{selectedMessage.content}</pre>
        </motion.div>
      </div>
    </div>
  );
};

export default Revision;

