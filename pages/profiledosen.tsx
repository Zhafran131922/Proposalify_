import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavbarAdmin';
import Card from '../components/Card';
import Table from '../components/Table';


const ProfileDosen = () => {
    return (
        <div className='bg-gray-100'>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default ProfileDosen;
