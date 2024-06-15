import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/AdminDashboard/Sidebar';
import Proposal from '../components/AdminDashboard/Proposal';
import Rekapitulasi from '../components/AdminDashboard/Rekapitulasi';
import Dosen from '../components/AdminDashboard/Dosen';

const UserAdmin = () => {
  const [activeComponent, setActiveComponent] = useState('MyProposal');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MyProposal':
        return <Proposal />;
      case 'Dosen':
        return <Dosen />;
      case 'Rekapitulasi':
        return <Rekapitulasi />;
      default:
        return <Proposal />;
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

export default UserAdmin;
