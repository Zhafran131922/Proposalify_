import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/PageDosen/Sidebar.js';
import ListProposal from '../components/PageDosen/ListProposal.js';



const PageDosen = () => {
    const [activeComponent, setActiveComponent] = useState('ListProposal');
  
    const renderComponent = () => {
      switch (activeComponent) {
        case 'ListProposal':
          return <ListProposal />;
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
  
  export default PageDosen;