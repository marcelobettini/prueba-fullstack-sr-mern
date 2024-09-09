import { useNavigate } from "react-router-dom"
import { useToken } from "../hooks/useToken";
import { useAuth } from "../context/AuthContext";
function Home() {
    const { user } = useToken();
    const { logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <h1>Pagina para usuarios de rol 'creador' y 'lector'</h1>
            <p>Hello {user?.username}</p>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    )
}

export default Home