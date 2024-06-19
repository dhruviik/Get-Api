const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Example data (can be replaced with a database)
let users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Doe', age: 35 }
];
let nextId = 4; // To generate new IDs for new users

// CRUD Operations using URL data

// CREATE a new user
app.post('/api/users', (req, res) => {
    const { name, age } = req.query;
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }
    const newUser = {
        id: nextId++,
        name,
        age: parseInt(age)
    };
    users.push(newUser);
    res.status(201).json({ newUser });
});

// READ all users or filter by name
app.get('/api/users', (req, res) => {
    const { name } = req.query;
    if (name) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json({ users: filteredUsers });
    }
    res.json({ users });
});

// READ user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
});

// UPDATE user by ID
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.query;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (name) {
        user.name = name;
    }
    if (age) {
        user.age = parseInt(age);
    }
    res.json({ user });
});


// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = users.splice(index, 1);
    res.json({ deletedUser });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// POST /api/users?name=Alice&age=28 - Create a new user named 'Alice' with age 28.
// GET /api/users - Retrieve all users.
// GET /api/users?name=John - Retrieve users whose name includes 'John'.
// GET /api/users/:id - Retrieve a user by ID.
// PUT /api/users/:id?name=Bob - Update a user's name by ID.
// DELETE /api/users/:id - Delete a user by ID