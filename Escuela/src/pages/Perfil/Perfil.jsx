import axios from "axios";
import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useApp";

export const Perfil = () => {

    const id = 1;
    const [User, setUser] = useState([]);

    const { setAlerta } = useAdmin();

    const formatDate = (dateString) => {
        const months = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
      
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
      
        return `${day}-${month}-${year}`;
      };
      

    useEffect(() => {
        console.log(User);
    }, [User]);

    useEffect(() => {
        Getuser();
    }, []);

    const Getuser = async () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`, config);
            setUser(data.user)
            setAlerta({
                error: false,
                msg: data.msg
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <div className="container">
            <h1>Perfil</h1>
                <div className="row">
                    <div className="col">
                        <h2>Bienvenido {User.nombre + " " + User.apellidos}</h2>
                        <p>{"Numero de usuario: " + User.ID}</p>
                        <p>{"Nombre: " + User.nombre}</p>
                        <p>{"Apellidos: " + User.apellidos}</p>
                        <p>{"Correo: " + User.correo}</p>
                        <p>{"Telefono: " + User.numero}</p>
                        <p>{"Direccion: " + User.direccion}</p>
                        <p>{"Fecha de nacimiento: " + formatDate(User.fechaNac)}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Perfil;