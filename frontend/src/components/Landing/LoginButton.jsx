import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }
    return (
        <div>
            <input type="submit" value="Log In" onClick={handleLoginClick} />
        </div>
    )
}

export default LoginButton;