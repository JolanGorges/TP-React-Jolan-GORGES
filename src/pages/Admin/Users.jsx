import { useState, useEffect } from 'react';
import { getAllUsers, changeUserType, deleteUser } from '../../services/userService';
import { NoUserConference } from '../../components';


const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        getAllUsers().then((response) => {
            setUsers(response.filter((user) => user.id !== currentUser.name));
        });
    }, []);

    const onDeleteUser = (userId) => {
        deleteUser(userId).then(() => {
            setUsers(users.filter((user) => user.id !== userId));
        });
    };

    const onUserTypeChange = (userId, newType) => {
        changeUserType(userId, newType).then((response) => {
            setUsers(users.map((user) => {
                if (user.id === userId) {
                    return { ...user, type: response.type };
                }
                return user;
            }));
        });

    };

    if (!users.length) {
        return (
            <NoUserConference user={true} />
        );
    }

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center">Utilisateurs</h1>
                <table className="min-w-full table-auto mt-8">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2 w-3/4">{user.id}</td>
                                <td className="border px-4 py-2">
                                    <select value={user.type} onChange={(e) => onUserTypeChange(user.id, e.target.value)} className="border py-2 px-4">
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-2 flex justify-center items-center">
                                    <button onClick={() => onDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;