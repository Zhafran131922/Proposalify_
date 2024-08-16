import { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/UserDashboard/Sidebar';
import MyProposal from '../components/UserDashboard/MyProposal';
import Revision from '../components/UserDashboard/Revision';
import Axios from 'axios';
import { useRouter } from 'next/router';

const UserDash = () => {
  const [activeComponent, setActiveComponent] = useState('MyProposal');
  const [username, setUsername] = useState('user');
  const router = useRouter();
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      router.push('/login'); // Redirect to login if user ID is not found
      return;
    }
    
    const fetchUser = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/users/users/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Optionally, you could redirect to login or show a user-friendly error message here
      }
    };
    
    fetchUser();
  }, [router]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MyProposal':
        return <MyProposal userId={localStorage.getItem('userId')} />;
      case 'Revision':
        return <Revision />;
      default:
        return <MyProposal userId={localStorage.getItem('userId')} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} username={username} />
        <div style={{ flex: 1, padding: '20px' }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
