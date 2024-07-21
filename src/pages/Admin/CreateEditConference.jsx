import * as conferenceService from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { Conference } from "../../components";
import { useParams } from "react-router-dom";

const CreateEditConference = () => {
    const { conferenceId } = useParams();
    const [conference, setConference] = useState(null);

    useEffect(() => {
        if (conferenceId) {
            conferenceService.getConference(conferenceId).then((response) => {
                setConference(response);
            });
        }
    }, [conferenceId]);

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold">{conference ? 'Modifier' : 'Créer'} une conférence</h1>
                <Conference conference={conference} />
            </div>
        </div>
    );
}

export default CreateEditConference;