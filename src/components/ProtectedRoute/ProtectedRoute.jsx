import { useState, useEffect } from "react";
import { checkIfAdmin } from "../../services/userService";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        checkIfAdmin().then((response) => {
            setIsAllowed(response);
        }).catch((_) => {
            setIsAllowed(false);
            navigate("/");
        });
    }, [navigate]);

    return isAllowed ? children : null;
}

export default ProtectedRoute;