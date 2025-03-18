require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ Add CORS Middleware Here
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

// ✅ Handle Preflight (OPTIONS) Requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
});

app.use(express.json());

// ✅ Define Your Routes After CORS Setup
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
