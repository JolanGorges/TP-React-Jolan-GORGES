const NoUserConference = ({ user = false }) => {
    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center">{user ? "Utilisateurs" : "Conférences"}</h1>
                {user ? (
                    <p className="text-center mt-8">Aucun utilisateur n'a été trouvé.</p>
                ) : (
                    <p className="text-center mt-8">Aucune conférence n'a été trouvée.</p>
                )}
            </div>
        </div>
    );
}

export default NoUserConference;