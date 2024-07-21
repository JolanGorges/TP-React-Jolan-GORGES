import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as conferenceService from "../services/conferenceService";

const Conference = () => {
    const { conferenceId } = useParams();
    const [conference, setConference] = useState(null);

    useEffect(() => {
        if (conferenceId) {
            conferenceService.getConference(conferenceId).then((response) => {
                setConference(response);
                console.log("it works");
            });
        }
    }, [conferenceId]);

    if (!conference) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-4 border rounded-lg shadow-lg" style={{ borderColor: conference.design.mainColor || '#000', backgroundColor: `${conference.design.secondColor}20` || '#fff' }}>

            <h1 className="text-2xl font-bold mb-4">{conference.title}</h1>
            <p className="text-gray-600 mb-4"><strong>ID :</strong> {conference.id}</p>
            <p className="text-gray-600 mb-4"><strong>Titre :</strong> {conference.title}</p>
            <p className="text-gray-600 mb-4"><strong>Date :</strong> {conference.date}</p>
            <p className="text-gray-600 mb-4"><strong>Créé le :</strong> {conference.createdAt}</p>
            <img className="w-full h-64 object-cover mb-4" src={conference.img} alt={conference.title} />
            <p className="text-gray-700 mb-4"><strong>Description :</strong> {conference.description}</p>
            <p className="text-gray-700 mb-4"><strong>Contenu :</strong> {conference.content}</p>
            {conference.duration && <p className="text-gray-700 mb-4"><strong>Durée :</strong> {conference.duration}</p>}
            {conference.osMap && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Emplacement</h2>
                    <p className="text-gray-700"><strong>Adresse ligne 1 :</strong> {conference.osMap.addressl1}</p>
                    <p className="text-gray-700"><strong>Adresse ligne 2 :</strong> {conference.osMap.addressl2}</p>
                    <p className="text-gray-700"><strong>Code postal :</strong> {conference.osMap.postalCode}</p>
                    <p className="text-gray-700"><strong>Ville :</strong> {conference.osMap.city}</p>
                    {conference.osMap.coordinates && (
                        <p className="text-gray-700"><strong>Coordonnées :</strong> {conference.osMap.coordinates.join(', ')}</p>
                    )}
                </div>
            )}
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Conférenciers</h2>
                {conference.speakers.map((speaker, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-gray-700"><strong>Prénom :</strong> {speaker.firstname}</p>
                        <p className="text-gray-700"><strong>Nom :</strong> {speaker.lastname}</p>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Stakeholders</h2>
                {conference.stakeholders.map((stakeholder, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-gray-700"><strong>Prénom :</strong> {stakeholder.firstname}</p>
                        <p className="text-gray-700"><strong>Nom :</strong> {stakeholder.lastname}</p>
                        {stakeholder.job && <p className="text-gray-600"><strong>Profession :</strong> {stakeholder.job}</p>}
                        {stakeholder.img && <img className="w-16 h-16 object-cover rounded-full" src={stakeholder.img} alt={`${stakeholder.firstname} ${stakeholder.lastname}`} />}
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Design</h2>
                <p className="text-gray-700"><strong>Couleur principale :</strong> {conference.design.mainColor}</p>
                <p className="text-gray-700"><strong>Deuxième couleur :</strong> {conference.design.secondColor}</p>
            </div>
        </div>
    );
};

export default Conference;
