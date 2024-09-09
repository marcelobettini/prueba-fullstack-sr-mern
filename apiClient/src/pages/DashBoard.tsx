import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
function DashBoard() {
    const navigate = useNavigate()
    const { user } = useToken();
    const { logout } = useAuth()
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <main>
            <header>
                <p style={{ textAlign: 'right' }}>Hello {user?.username}</p>
                <h1>Tablero de Administrador</h1>
                <nav>
                    <div style={{ margin: 'auto', display: 'flex', justifyContent: "center", columnGap: '1rem', border: '1px solid', padding: '10px', borderRadius: '10px' }}>
                        <button onClick={() => navigate('/admin/themes')}>Temas</button>
                        <button onClick={() => navigate('/admin/categories')}>Categorías</button>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>

                </nav>
            </header>
            <Outlet />
        </main>
    )
}

export default DashBoard