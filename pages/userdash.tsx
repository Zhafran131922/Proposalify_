import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/UserDashboard/Sidebar';
import MyProposal from '../components/UserDashboard/MyProposal';
import Revision from '../components/UserDashboard/Revision';
import { useRouter } from 'next/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  userId: string;
}

const UserDash = () => {
  const [activeComponent, setActiveComponent] = useState('MyProposal');
  const [username, setUsername] = useState('user');
  const [userId, setUserId] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as DecodedToken;
        const { userId } = decodedToken;
        setUserId(userId);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

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
