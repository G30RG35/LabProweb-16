import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";

const AdminLayout = () => {
    const { auth, loading } = useAuth();

    if(loading) return (
        <h1>Cargando</h1>
    )

    const res = auth?.roles?.filter(rol => rol === "3");

    return (
        <>
            {auth.ID && res.length > 0 ? (
                <>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            ) : <Navigate to="/" />}
        </>
    )
}

export default AdminLayout