import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import MateriaRoutes from "./routes/MateriaRoutes.js";
import PeriodoRoutes from "./routes/PeriodoRoutes.js";
import SalonRoutes from "./routes/SalonRoutes.js";
import RolRoutes from "./routes/RolRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import GrupoRoutes from './routes/GrupoRoutes.js';
import EscolaridadRoutes from './routes/EscolaridadRoutes.js';
import ClaseRoutes from './routes/ClaseRoutes.js';

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
app.use('/api/rol', RolRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/grupos', GrupoRoutes);
app.use('/api/escolaridad', EscolaridadRoutes);
app.use('/api/clases', ClaseRoutes);

/** 
app.use('/api/escolaridad');
*/

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})