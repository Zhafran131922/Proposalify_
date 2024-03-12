import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavbarAdmin';
import Card from '../components/Card';
import Table from '../components/Table';


const AdminPage = () => {
    return (
        <div className='bg-gray-100'>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    <Sidebar />
                </div>
                <div style={{ flex: '3' }}>
                    <Navbar/>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Card title="20" content="Proposal Masuk" />
                        <Card title="15" content="Proposal dalam tahap review" />
                    </div>
                    <div>
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
