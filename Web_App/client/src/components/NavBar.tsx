import React from 'react';
import {Link} from 'react-router-dom';
const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    Home
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/addProduct">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/Profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
