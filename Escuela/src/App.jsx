import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';
import AdminLayout from './layout/AdminLayout';
import Admin from './pages/Admin/Admin';
import { Eventos } from './pages/Eventos/Eventos';
import CrudAlumnos from './pages/Admin/CrudAlumnos/CrudAlumnos';
import CrudMestros from './pages/Admin/CrudMaestros/CrudMaestros';
import { AdminProvider } from './context/AdminProvider';
import { Nosotros } from './pages/Nosotros/nosotros';
import { CrudClases } from './pages/Admin/CrudClases/CrudClases';
import { Calificaciones } from './pages/Calificaciones/Calificaciones';
import { PerdiodosVistaAlumno } from './pages/PerdiodosVistaAlumno/PerdiodosVistaAlumno';
import { Administrador } from './pages/Administrador/Administrador';
import CrudAdmin from './pages/Admin/CrudAdmin/CrudAdmin';
import CrudPeriodos from './pages/Admin/CrudPeriodos/CrudPeriodos';
import CrudGrupos from './pages/Admin/CrudGrupos/CrudGrupos';
import CrudMaterias from './pages/Admin/CrudMaterias/CrudMaterias';
import CrudMatMaestros from './pages/Admin/CrudMatMaestros/CrudMatMaestros';
import { CrudSalones } from './pages/Admin/CrudSalones/CrudSalones';
import { CrudEscolaridad } from './pages/Admin/CrudEscolaridad/CrudEscolaridad';
import { CrudEventos } from './pages/Admin/CrudEventos/CrudEventos';
import CrudClaseAlumno from './pages/Admin/CrudClaseAlumno/CrudClaseAlumno';
import Perfil from './pages/Perfil/Perfil';
import AlumnoLayout from './layout/AlumnoLayout';
import { ListadoGrupos } from './pages/ListadoGrupos/ListadoGrupos';
import ReporteCalificaciones from './pages/ReporteCalificaciones/ReporteCalificaciones';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path='login' element={<Login />} />
                <Route path='eventos' element={<Eventos />} />
                <Route path='nosotros' element={<Nosotros />} />
                <Route path='clases' element={<CrudClases />} />
                <Route path='calificaciones' element={<Calificaciones />} />
                <Route path='periodos' element={<PerdiodosVistaAlumno />} />
                <Route path='administrador' element={<Administrador />} />

                 {/* /mestro */}
                 <Route path='Listado-de-Grupos' element={<ListadoGrupos />} />
              </Route>

              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path='alumnos' element={<CrudAlumnos />} />
                <Route path='maestros' element={<CrudMestros />} />
                <Route path='admin' element={<CrudAdmin />} />
                
                <Route path='grupos' element={<CrudGrupos />} />
                <Route path='periodos' element={<CrudPeriodos />} />
                <Route path='salones' element={<CrudSalones />} />
                <Route path='escolaridad' element={<CrudEscolaridad />} />

                <Route path='materias' element={<CrudMaterias />} />
                <Route path='clase-maestro2' element={<CrudMatMaestros />} />

                <Route path='eventos' element={<CrudEventos />} />
                <Route path='reportes/calificaciones' element={<ReporteCalificaciones />} />

                <Route path='clase-maestro' element={<CrudClases />} />
                <Route path='clase-alumno/:grupoID/:materiaID/:userID' element={<CrudClaseAlumno />} />
              </Route>

              <Route path='/alumno' element={<AlumnoLayout />}>
                <Route index element={<Perfil />} />
              </Route>



            </Routes>

        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
