import React, { useState } from 'react';
import axios from 'axios';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/signup`, {
                email,
                password,
            });
            if (response.data.success) {
                setSignupSuccess('User registered successfully!');
                setSignupError('');
            } else {
                setSignupError(response.data.message);
                setSignupSuccess('');
            }
        } catch (error) {
            setSignupError('An error occurred during signup');
            setSignupSuccess('');
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {signupError && <div className="text-red-500 mb-4">{signupError}</div>}
                {signupSuccess && <div className="text-green-500 mb-4">{signupSuccess}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-primary hover:bg-green-three text-white rounded py-2 px-4 w-full">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
