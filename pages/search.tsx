import React from 'react';
import Navbar from '../components/Navbar';
import Search from '../components/SearchBar';


const SearchBar = () => {
    return (
        <div>
            <Navbar/>
            <div className='flex justify-center mt-20'>
            <Search/>
        </div>

        </div>
        
    );
};

export default SearchBar;
