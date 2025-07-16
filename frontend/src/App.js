import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://127.0.0.1:8000';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchTasks();
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        console.log('Attempting to log in...');
        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await axios.post(`${API_URL}/token`, formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            const new_token = response.data.access_token;
            setToken(new_token);
            localStorage.setItem('token', new_token);
            console.log('Login successful, token set.');
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login failed', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Attempting to register...');
        try {
            await axios.post(`${API_URL}/users/`, { email, password });
            console.log('Registration successful.');
            setIsRegistering(false); // Switch back to login form
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('Registration successful! Please log in.'); // Give feedback
        } catch (error) {
            setError(error.response?.data?.detail || 'Registration failed.');
            console.error('Registration failed', error);
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const fetchTasks = async () => {
        console.log('Fetching tasks...');
        try {
            const response = await axios.get(`${API_URL}/users/me/tasks/`);
            console.log('Tasks fetched:', response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        console.log('Creating task with title:', newTaskTitle);
        if (!newTaskTitle.trim()) return;
        try {
            const response = await axios.post(`${API_URL}/users/me/tasks/`, {
                title: newTaskTitle
            });
            console.log('Task created:', response.data);
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        console.log('Deleting task with id:', taskId);
        try {
            await axios.delete(`${API_URL}/users/me/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    if (!token) {
        return (
            <div className="login-container">
                {isRegistering ? (
                    <form onSubmit={handleRegister} className="login-form">
                        <h2>Register</h2>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Register</button>
                        <button type="button" onClick={() => { setIsRegistering(false); setError(''); setPassword(''); setConfirmPassword(''); }} className="toggle-form-btn">
                            Back to Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="login-form">
                        <h2>Login</h2>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        <button type="button" onClick={() => { setIsRegistering(true); setError(''); setPassword(''); }} className="toggle-form-btn">
                            Need an account? Register
                        </button>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="task-manager-container">
            <header>
                <h1>Task Manager</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <form onSubmit={handleCreateTask} className="task-form">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span>{task.title}</span>
                        <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
