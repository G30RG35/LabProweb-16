import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AlumnoRoutes from "./routes/AlumnoRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

// Configurar Cors
const whiteList = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Esta permitido consultar la API
            callback(null, true);
        } else {
            // No esta permitido a consultar la API
            callback(new Error('Error de cors'));
        }
    }
}

app.use(cors(corsOptions));

/** --- ROUTING --- */


/** ZONA ADMIN */


/** ZONA MAESTROS */

/** ZONA ALUMNOS */

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})