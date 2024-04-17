import React from 'react';
import Sidebar from '../components/Sidebar';


const Pengaturan = () => {
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

export default Pengaturan;