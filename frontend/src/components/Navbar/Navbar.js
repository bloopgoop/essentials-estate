import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import './Navbar.css';
import person from '../../assets/person.svg';
import bell from '../../assets/bell.svg';
import envelope from '../../assets/envelope.svg';

// TODO: add buttons and dropdowns
// add search function
// change profile image to background so it is customizable

function Navbar() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <nav id='navbar'>
            <input type="text" placeholder="Search" />
            <button id='search-btn'>Search</button>

            <Link to='/register-property'>
                <button>List your property!</button>
            </Link>

            <img src={bell} className='nav-icons' id='bell' name='bell' alt='bell' />
            <img src={envelope} className='nav-icons' id='envelope' name='envelope' alt='envelope' />
            {user ? <p onClick={logoutUser}>Logout</p> : <p><Link to={"/login"}>Login</Link></p>}
            <img src={person} id='profile' name='profile' alt='profile' />
        </nav>
    );
}

export default Navbar;
