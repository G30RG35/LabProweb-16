import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';
import AdminLayout from './layout/AdminLayout';
import Admin from './pages/Admin/Admin';
import { Eventos } from './pages/Eventos/Eventos';
import Nosotros from './pages/Nosotros/Nosotros';
import CrudAlumnos from './pages/Admin/CrudAlumnos/CrudAlumnos';
import { AdminProvider } from './context/AdminProvider';

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
              </Route>
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path='alumnos' element={<CrudAlumnos />} />
              </Route>
            </Routes>
          </AdminProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
