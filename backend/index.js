import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createConnection from "./config/DB.js";
import UserRoutes from "./routes/UserRoutes.js";
import MateriaRoutes from "./routes/MateriaRoutes.js";
import PeriodoRoutes from "./routes/PeriodoRoutes.js";
import SalonRoutes from "./routes/SalonRoutes.js";
import Salon from "./models/Salon.js";

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
app.use('/api/users', UserRoutes);

app.use('/api/materias', MateriaRoutes);
app.use('/api/periodos', PeriodoRoutes);
app.use('/api/salones', SalonRoutes);

/** 
app.use('/api/grupos');
app.use('/api/clases');
app.use('/api/escolaridad');
app.use('/api/escolaridad');
app.use('/api/rol');

*/

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})