import * as conferenceService from "../../services/conferenceService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../FormField/FormField";
import PersonManagement from "../PersonManagement/PersonManagement";

const Conference = ({ conference }) => {
    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [duration, setDuration] = useState("");
    const [addressl1, setAddressl1] = useState("");
    const [addressl2, setAddressl2] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const [speakers, setSpeakers] = useState([]);
    const [stakeholders, setStakeholders] = useState([]);
    const [mainColor, setMainColor] = useState("");
    const [secondColor, setSecondColor] = useState("");

    useEffect(() => {
        if (conference) {
            setId(conference.id);
            setTitle(conference.title);
            setDate(conference.date);
            setDescription(conference.description);
            setImg(conference.img);
            setContent(conference.content);
            setDuration(conference.duration);
            setAddressl1(conference.osMap.addressl1);
            setAddressl2(conference.osMap.addressl2);
            setPostalCode(conference.osMap.postalCode);
            setCity(conference.osMap.city);
            setCoordinates(conference.osMap.coordinates);
            setSpeakers(conference.speakers);
            setStakeholders(conference.stakeholders);
            setMainColor(conference.design.mainColor);
            setSecondColor(conference.design.secondColor);
        }
    }, [conference]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const conference = {
            title,
            date,
            description,
            img,
            content,
            duration,
            createdAt: Date.now(),
            osMap: {
                addressl1,
                addressl2,
                postalCode,
                city,
                coordinates,
            },
            speakers,
            stakeholders,
            design: {
                mainColor,
                secondColor,
            },
        };

        if (id === null) {
            await conferenceService.createConference(conference);
        } else {
            await conferenceService.updateConference(id, conference);
        }

        navigate("/admin/conferences");
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <FormField label="Titre" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <FormField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <FormField label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <FormField label="Image URL" type="text" value={img} onChange={(e) => setImg(e.target.value)} />
                    <FormField label="Contenu" type="textarea" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <FormField label="Durée" type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    <FormField label="Adresse ligne 1" type="text" value={addressl1} onChange={(e) => setAddressl1(e.target.value)} />
                    <FormField label="Adresse ligne 2" type="text" value={addressl2} onChange={(e) => setAddressl2(e.target.value)} />
                    <FormField label="Code postal" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    <FormField label="Ville" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    <FormField label="Couleur principale" type="text" value={mainColor} onChange={(e) => setMainColor(e.target.value)} required />
                    <FormField label="Couleur secondaire" type="text" value={secondColor} onChange={(e) => setSecondColor(e.target.value)} />


                    <PersonManagement type="Speaker" people={speakers} setPeople={setSpeakers} />
                    <PersonManagement type="Stakeholder" people={stakeholders} setPeople={setStakeholders} />
                    <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded mb-4">
                        Enregistrer
                    </button>
                </form>
            </div >
        </div >
    );
}

export default Conference;