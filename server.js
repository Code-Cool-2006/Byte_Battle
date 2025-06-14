const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Connect to MongoDB (replace with your own URI if needed)
mongoose.connect('mongodb://localhost:27017/byte_battle', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { email, name, password, role } = req.body;
    if (!email || !name || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered.' });
        }
        const user = new User({ email, name, password, role });
        await user.save();
        res.status(201).json({ message: 'Registration successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.findOne({ email, password, role });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials or role.' });
        }
        res.json({ message: 'Login successful.', user: { email: user.email, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/api/generate-uin', (req, res) => {
  const { email } = req.body;
  // Generate a random UIN (for demo)
  const uin = Math.floor(100000 + Math.random() * 900000).toString();
  res.json({ uin });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});