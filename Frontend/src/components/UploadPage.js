import React, { useState } from "react";
import "../styles/UploadCSV.css";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // ✅ Success/Error type

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            setMessageType("error"); // ❌ Set error type
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            setMessage(`✅ ${data.msg}`); // Success message
            setMessageType("success"); // ✅ Set success type

        } catch (error) {
            setMessage(`❌ ${error.message}`); // Error message
            setMessageType("error"); // ❌ Set error type
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload CSV</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
            {/* ✅ Apply dynamic class based on messageType */}
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default UploadPage;
