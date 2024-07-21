import React, { useEffect } from 'react';
import { useState } from 'react';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(id, password);
            localStorage.setItem("user", JSON.stringify({
                "name": id, "accessToken": response
            }));
            navigate(0);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Connexion</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom d'utilisateur</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mot de passe</label>
                        <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;