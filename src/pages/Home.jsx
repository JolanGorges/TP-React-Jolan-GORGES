import * as conferenceService from "../services/conferenceService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoUserConference } from "../components";

const Home = () => {
    const navigate = useNavigate();
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        conferenceService.getAllConferences().then((response) => {
            setConferences(response);
        });
    }, []);

    const viewConference = (conferenceId) => {
        navigate(`/conference/${conferenceId}`);
    }

    if (!conferences.length) {
        return (
            <NoUserConference />
        );
    }

    return (
        <div>
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center">Conférences</h1>
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
                                        <button onClick={() => viewConference(conference.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Voir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;