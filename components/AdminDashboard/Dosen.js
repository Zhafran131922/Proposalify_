import { useState } from 'react';
import Modal from './PopUp/add-dosen'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Nama Dosen", "Bidang Keahlian", "Status"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

function ProposalTable() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredRows = TABLE_ROWS.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery) ||
      row.job.toLowerCase().includes(searchQuery) ||
      row.org.toLowerCase().includes(searchQuery) ||
      row.email.toLowerCase().includes(searchQuery)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortConfig.key === 'name' || sortConfig.key === 'job') {
      const nameA = a[sortConfig.key].toUpperCase();
      const nameB = b[sortConfig.key].toUpperCase();
      if (nameA < nameB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    } else if (sortConfig.key === 'date') {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

    
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <Card className="w-11/12 rounded-lg mt-10">
      <CardBody>
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
       
            {/* <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className='rounded-full'
            /> */}    
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px', 
                  backgroundColor: 'transparent',
                },
              }}
            >
              <TextField
                fullWidth
                label="Search..."
                id="fullWidth"
                value={searchQuery}
                onChange={handleSearch}
                variant="outlined"
              />
            </Box>
            <Modal isOpen={isModalOpen} onClose={closeModal} zIndex={9999}></Modal>
        </div>

        <table className="w-full text-left mt-4">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-blue-gray-100 bg-blue-gray-50/50 p-4 cursor-pointer"
                  onClick={() => requestSort(index === 0 ? 'name' : index === 1 ? 'job' : index === 3 ? 'date' : '')}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                    {sortConfig.key === (index === 0 ? 'name' : index === 1 ? 'job' : index === 3 ? 'date' : '') &&
                      (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === sortedRows.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" style={{ width: '32px', height: '32px' }} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ProposalTable;
