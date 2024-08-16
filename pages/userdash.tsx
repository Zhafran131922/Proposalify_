import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/UserDashboard/Sidebar';
import MyProposal from '../components/UserDashboard/MyProposal';
import Revision from '../components/UserDashboard/Revision';
import Axios from 'axios';
import { useRouter } from 'next/router';

const UserDash = () => {
  const [activeComponent, setActiveComponent] = useState('MyProposal');
  const [username, setUsername] = useState('user');
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      const storedUserId: any = localStorage.getItem('userId');
      if (!storedUserId) {
        console.error('User ID not found in localStorage');
        router.push('/login'); // Redirect to login if user ID is not found
        return;
      }
      
      setUserId(storedUserId);
      
      const fetchUser = async () => {
        try {
          const response = await Axios.get(`http://localhost:5000/api/users/users/${storedUserId}`);
          setUsername(response.data.username);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          // Optionally, you could redirect to login or show a user-friendly error message here
        }
      };
      
      fetchUser();
    }
  }, [router]);

  const renderComponent = () => {
    if (!userId) return null; // Avoid rendering if userId is not yet set
    switch (activeComponent) {
      case 'MyProposal':
        return <MyProposal userId={userId} />;
      case 'Revision':
        return <Revision />;
      default:
        return <MyProposal userId={userId} />;
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
