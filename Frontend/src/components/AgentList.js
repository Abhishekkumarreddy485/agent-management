import React, { useState, useEffect } from 'react';
import { addAgent, getAgents, deleteAgent } from '../services/agentService';

const AgentList = () => {
    const [agents, setAgents] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        const response = await getAgents();
        setAgents(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAgent(formData);
        fetchAgents();
        setFormData({ name: '', email: '', mobile: '', password: '' });
    };

    const handleDelete = async (id) => {
        await deleteAgent(id);
        fetchAgents();
    };

    return (
        <div>
            <h2>Agents</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })} required />
                <input type="text" placeholder="Mobile" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value })} required />
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value })} required />
                <button type="submit">Add Agent</button>
            </form>
            <ul>
                {agents.map(agent => (
                    <li key={agent._id}>
                        {agent.name} - {agent.email}
                        <button onClick={() => handleDelete(agent._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgentList;
