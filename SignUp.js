import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"    // Assuming you are using shadcn/ui
import { Input } from "@/components/ui/input"      // Assuming you are using shadcn/ui
import { Label } from "@/components/ui/label"      // Assuming you are using shadcn/ui

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Signup successful:', data);
                navigate('/user-profile', { state: { message: 'Account Created Successfully!', user: data.user } });
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Error: Could not connect to server');
        }
    };

    return (
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
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
            <div>
                <Label htmlFor="confirmPassword">Confirm Password:</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </div>
            <Button type="submit">Sign Up</Button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default SignUp;