import React from 'react';
import './Navbar.css';
import person from '../../assets/person.svg';
import bell from '../../assets/bell.svg';
import envelope from '../../assets/envelope.svg';

function Navbar() {
    return (
        <nav id='navbar'>
            <div>
                <input type="text" placeholder="Search" />
                <button id='search-btn'>Search</button>
            </div>

            <div>
                <img src={bell} className='nav-icons' id='bell' name='bell' alt='bell' />
                <img src={envelope} className='nav-icons' id='envelope' name='envelope' alt='envelope' />
                <img src={person} id='profile' name='profile' alt='profile' />
            </div>
        </nav>
    );
}

export default Navbar;
