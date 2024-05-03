import React from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import Card from '../components/Card';
import { Tab } from 'react-bootstrap';
import Navbar from '../components/NavbarAdmin';


const AdminPageRekapitulasi = () => {
    return (
        <div className='bg-gray-100'>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    <Sidebar />
                </div>
                <div style={{ flex: '3' }}>
                    <Navbar/>
                    <div style={{}}>
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPageRekapitulasi;
