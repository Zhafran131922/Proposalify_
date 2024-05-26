import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/UserDashboard/Sidebar';
import MyProposal from '../components/UserDashboard/MyProposal';
import Revision from '../components/UserDashboard/Revision';

const UserDash = () => {
  const [activeComponent, setActiveComponent] = useState('MyProposal');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MyProposal':
        return <MyProposal />;
      case 'Revision':
        return <Revision />;
      default:
        return <MyProposal />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <div style={{ flex: 1, padding: '20px' }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
