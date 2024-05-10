import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";
import Loader from "../Componentes/Loader/Loader";
import { AdminProvider } from "../context/AdminProvider";

const AdminLayout = () => {
    const { auth, loading } = useAuth();

    if(loading) return (
        <div className="container-fluid">
            <Loader />
        </div>
    )

    const res = auth?.roles?.filter(rol => rol === "3");

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

export default AdminLayout