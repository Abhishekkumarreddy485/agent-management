import { useState } from "react";
import "../styles/AgentForm.css";

const AgentForm = () => {
    const [agent, setAgent] = useState({ name: "", email: "", mobile: "", password: "" });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        setAgent({ ...agent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message before submission

        try {
            const res = await fetch("http://localhost:5000/api/agents/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agent),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Agent added successfully!");
                setMessageType("success");
                setAgent({ name: "", email: "", mobile: "", password: "" }); // Clear form fields
            } else {
                setMessage(data.message || "Failed to add agent.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="agent-form-container">
            <h2>Add New Agent</h2>
            {message && <p className={`message ${messageType}`}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={agent.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={agent.email} onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile" value={agent.mobile} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={agent.password} onChange={handleChange} required />
                <button type="submit">Add Agent</button>
            </form>
        </div>
    );
};

export default AgentForm;
