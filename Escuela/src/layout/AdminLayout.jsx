import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";

const AdminLayout = () => {
    const { auth, loading } = useAuth();

    if(loading) return (
        <h1>Cargando</h1>
    )

    return (
        <>
            {auth.ID && auth.rol === "Administrador" ? (
                <>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            ) : <Navigate to="/login" />}
        </>
    )
}

export default AdminLayout