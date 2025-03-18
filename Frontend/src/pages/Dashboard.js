import React, { useEffect, useState } from "react";
import AgentTaskList from "../components/AgentTaskList"; 

const Dashboard = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/agents");
                const data = await response.json();
                setAgents(data);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        fetchAgents();
    }, []);

    return (
        <div>
            <h2>Distributed Lists</h2>
            {agents.map((agent) => (
                <div key={agent._id}>
                    <h3>{agent.name}</h3>
                    <ul>
                        {agent.tasks?.map((task, index) => (
                            <li key={index}>{task.FirstName} - {task.Phone}</li>
                        ))}
                    </ul>
                </div>
            ))}
             <div>
                <AgentTaskList /> {/* This will render the agent tasks */}
            </div>
        </div>
    );
};

export default Dashboard;
