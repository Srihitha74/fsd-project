import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"  // Assuming you are using shadcn/ui
import { Input } from "@/components/ui/input"    // Assuming you are using shadcn/ui
import { Label } from "@/components/ui/label"    // Assuming you are using shadcn/ui

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('userId', data.userId);
                navigate('/user-profile', { state: { message: 'Login Successful!', user: data.user } });
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Error: Could not connect to server');
            console.error('Login error:', err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
            <div>
                <Label htmlFor="password">Password:</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </div>
            <Button type="submit">Log In</Button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default Login;
