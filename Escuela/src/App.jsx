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
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Crud_Clases } from './pages/CrudDeClases/Crud_Clases';
import { Calificaciones } from './pages/Calificaciones/Calificaciones';
import { PerdiodosVistaAlumno } from './pages/PerdiodosVistaAlumno/PerdiodosVistaAlumno';
import { Administrador } from './pages/Administrador/Administrador';
import CrudAdmin from './pages/Admin/CrudAdmin/CrudAdmin';
import { Maestros } from './pages/CrudMaestros/Maestros';
import { Alumnos } from './pages/CrudAlumnos/Alumnos';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AdminProvider>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path='login' element={<Login />} />
                <Route path='eventos' element={<Eventos />} />
                <Route path='nosotros' element={<Nosotros />} />

                <Route path='calificaciones' element={<Calificaciones />} />
                <Route path='periodos' element={<PerdiodosVistaAlumno />} />
                <Route path='administrador' element={<Administrador />} />
                <Route path='maestros' element={<Maestros />} />
                <Route path='alumnos' element={<Alumnos />} />
              </Route>

              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path='alumnos' element={<CrudAlumnos />} />
                <Route path='maestros' element={<CrudMestros />} />
                <Route path='admin' element={<CrudAdmin />} />
                <Route path='grupos' element={<Crud_Clases />} />
              </Route>
            </Routes>
          </AdminProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
