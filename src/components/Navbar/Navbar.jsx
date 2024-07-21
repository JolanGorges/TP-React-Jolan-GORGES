import React from 'react';
import { Link } from 'react-router-dom';
import { checkIfAdmin } from '../../services/userService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkIfAdmin().then((response) => {
            setIsAdmin(response);
            setLoggedUser(true);
        }).catch((_) => {
            setIsAdmin(false);
            setLoggedUser(false);
        });
    }, []);

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        setLoggedUser(false);
        navigate(0);
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-white font-bold text-xl">TP Jolan GORGES</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</Link>
                            {loggedUser ? (
                                <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Déconnexion</button>
                            ) : (
                                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Connexion</Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Utilisateurs</Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin/conferences" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Conférences</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;