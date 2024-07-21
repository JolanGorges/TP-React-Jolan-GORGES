import React, { useState } from 'react';

const PersonManagement = ({ people, setPeople, type }) => {
    const [person, setPerson] = useState({ firstname: "", lastname: "", job: "", img: "" });
    const [selectedPersonIndex, setSelectedPersonIndex] = useState(-1);

    const updatePerson = (property, e) => {
        setPerson({ ...person, [property]: e.target.value });
        if (selectedPersonIndex !== -1) {
            const newPeople = people.map((p, index) => (
                index === selectedPersonIndex ? { ...p, [property]: e.target.value } : p
            ));
            setPeople(newPeople);
        }
    };

    const handlePersonChange = (e) => {
        if (e.target.value === `new${type}`) {
            setSelectedPersonIndex(-1);
            setPerson({ firstname: "", lastname: "", job: "", img: "" });
        } else {
            const index = parseInt(e.target.value);
            setSelectedPersonIndex(index);
            setPerson(people[index]);
        }
    };

    const addPerson = (e) => {
        e.preventDefault();
        setPeople([...people, person]);
        setSelectedPersonIndex(people.length);
    };

    const deletePerson = (e) => {
        e.preventDefault();
        setPeople(people.filter((_, index) => index !== selectedPersonIndex));
        setSelectedPersonIndex(-1);
        setPerson({ firstname: "", lastname: "", job: "", img: "" });
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700">{type === "Stakeholder" ? "Stakeholders" : "Conférenciers"}</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={selectedPersonIndex === -1 ? `new${type}` : selectedPersonIndex}
                    onChange={handlePersonChange}
                >
                    <option value={`new${type}`}>Ajouter nouveau {type === "Stakeholder" ? "stakeholder" : "conférencier"}</option>
                    {people.map((p, index) => (
                        <option key={index} value={index}>{p.firstname} {p.lastname}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Prénom</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={person.firstname} onChange={(e) => updatePerson("firstname", e)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={person.lastname} onChange={(e) => updatePerson("lastname", e)} />
            </div>
            {type === "Stakeholder" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profession</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={person.job} onChange={(e) => updatePerson("job", e)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={person.img} onChange={(e) => updatePerson("img", e)} />
                    </div>
                </>
            )}
            {selectedPersonIndex === -1 ? (
                <div className="mb-4">
                    <button className="bg-indigo-600 text-white p-2 rounded" onClick={addPerson}>Ajouter {type === "Stakeholder" ? "stakeholder" : "conférencier"}</button>
                </div>
            ) : (
                <div className="mb-4">
                    <button className="bg-red-600 text-white p-2 rounded" onClick={deletePerson}>Supprimer {type === "Stakeholder" ? "stakeholder" : "conférencier"}</button>
                </div>
            )}
        </div>
    );
};

export default PersonManagement;