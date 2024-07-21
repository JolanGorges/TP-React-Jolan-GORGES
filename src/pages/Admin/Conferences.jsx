import * as conferenceService from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoUserConference } from "../../components";

const Conferences = () => {
    const [conferences, setConferences] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        conferenceService.getAllConferences().then((response) => {
            setConferences(response);
        });
    }, []);

    const deleteConference = (conferenceId) => {
        conferenceService.deleteConference(conferenceId).then(() => {
            setConferences(conferences.filter((conference) => conference.id !== conferenceId));
        });
    }

    const editConference = (conferenceId) => {
        navigate(`/admin/edit-conference/${conferenceId}`);
    }

    const createConference = () => {
        navigate("/admin/create-conference");
    }

    if (!conferences.length) {
        return (
            <>
                <NoUserConference />
                <div className="flex justify-center mt-8">
                    <button onClick={createConference} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Créer une nouvelle conférence
                    </button>
                </div >
            </>
        );
    }

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Conférences</h1>
                    <button onClick={createConference} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Créer une nouvelle conférence
                    </button>
                </div>
                <table className="min-w-full table-auto mt-8">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Titre</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferences.map((conference) => (
                            <tr key={conference.id}>
                                <td className="border px-4 py-2 w-3/4">{conference.title}</td>
                                <td className="border px-4 py-2 flex justify-center items-center">
                                    <button onClick={() => editConference(conference.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteConference(conference.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
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

export default Conferences;