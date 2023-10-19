import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import gear from '../../assets/gear.svg';

function Sidebar() {
    return (
        <div id="sidebar">
            <h1>
                sdfsd
            </h1>
            <h2 id="logo">
                <Link to="/" style={{textDecoration: 'none'}}>ʕ•́ᴥ•̀ʔっ♡</Link>
            </h2>
            <nav>
                <ul>
                    <div>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/watching">Watching</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </div>

                    <div>
                        <li><Link to="/settings"><img src={gear} alt="Your SVG" />Settings</Link></li>
                        <li><Link to="/logout">Log Out</Link></li>  
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
