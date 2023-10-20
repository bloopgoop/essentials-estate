import React from 'react';
import './Navbar.css';
import person from '../../assets/person.svg';
import bell from '../../assets/bell.svg';
import envelope from '../../assets/envelope.svg';

// TODO: add buttons and dropdowns
// add search function
// change profile image to background so it is customizable

function Navbar() {
    return (
        <nav id='navbar'>
            <input type="text" placeholder="Search" />
            <button id='search-btn'>Search</button>

            <img src={bell} className='nav-icons' id='bell' name='bell' alt='bell' />
            <img src={envelope} className='nav-icons' id='envelope' name='envelope' alt='envelope' />
            <img src={person} id='profile' name='profile' alt='profile' />
        </nav>
    );
}

export default Navbar;
