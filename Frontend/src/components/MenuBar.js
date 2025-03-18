import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import '../styles/MenuBar.css';

const MenuBar = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <div className="menu-bar">
            <div className="menu-items">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/add-agent">Add Agent</Link>
                <Link to="/upload">Upload CSV</Link>
            </div>
            <div className="user-info">
                <span>{user.email}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default MenuBar;
