import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';
import AdminLayout from './layout/AdminLayout';
import Admin from './pages/Admin/Admin';
import { Eventos } from './pages/Eventos/Eventos';

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
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Admin />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
