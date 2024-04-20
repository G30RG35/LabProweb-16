import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";
import Loader from "../Componentes/Loader/Loader";

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