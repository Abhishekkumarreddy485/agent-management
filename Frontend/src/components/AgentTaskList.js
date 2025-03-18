import React, { useEffect, useState } from "react";
import "../styles/AgentTaskList.css"; // ✅ Import the CSS file

const AgentTaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <div className="agent-task-container">
            <h2 className="agent-task-title">Distributed Agent Tasks</h2>

            <div className="agent-task-table-wrapper">
                <table className="agent-task-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Phone</th>
                            <th>Notes</th>
                            <th>Assigned Agent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.FirstName}</td>
                                    <td>{task.Phone}</td>
                                    <td>{task.Notes || "N/A"}</td>
                                    <td>{task.assignedAgent}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="agent-task-empty">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentTaskList;
