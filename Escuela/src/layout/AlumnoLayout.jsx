import { Outlet, Navigate } from "react-router-dom";
import { AdminProvider } from "../context/AdminProvider";
import useAuth from "../hooks/useAuth";
import { Header } from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";
import Loader from "../Componentes/Loader/Loader";

const AlumnoLayout = () => {
    const { auth, loading } = useAuth();

    if(loading) return (
        <div className="container-fluid">
            <Loader />
        </div>
    )

    const res = auth?.roles?.filter(rol => rol === "1");

    return (
        <>
            {auth.ID && res.length > 0 ? (
                <>
                    <AdminProvider>
                        <Header />
                        <main>
                            <Outlet />
                        </main>
                        <Footer />
                    </AdminProvider>
                </>
            ) : <Navigate to="/" />}
        </>
    )
}

export default AlumnoLayout