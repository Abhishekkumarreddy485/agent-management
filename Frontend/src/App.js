import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AgentForm from "./components/AgentForm";
import UploadPage from "./components/UploadPage";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import "./App.css"; 

export const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState({
        email: "",
        authenticated: !!localStorage.getItem("token"),
    });

    const login = (email, token) => {
        localStorage.setItem("token", token);
        setUser({ email, authenticated: true });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser({ email: "", authenticated: false });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            <Router>
                {user.authenticated && <MenuBar />} 
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={user.authenticated ? <Dashboard /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/add-agent"
                        element={user.authenticated ? <AgentForm /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/upload"
                        element={user.authenticated ? <UploadPage /> : <Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
};

export default App;