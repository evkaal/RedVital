import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// 1. IMPORTA TUS NUEVOS COMPONENTES AQUÍ
import Inventory from './pages/Inventory'; 
import Hospitals from './pages/Hospitals'; 
import UserManagement from './pages/UserManagement';
import RequestQueue from './pages/Solicitud';


function App() {
    return (
       <BrowserRouter>
            <Routes>
                {/* Redirección raíz al login */}
                <Route path="/" element={<Navigate to="/login" />} />
                
                {/* Rutas Públicas */}
                <Route path="/login" element={<Login />} />
                
                {/* Rutas Protegidas */}
                <Route path="/dashboard" element={<Dashboard />} />
               
                {/* 2. AGREGA ESTAS LÍNEAS PARA TUS NUEVAS PÁGINAS */}
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/Hospitals" element={<Hospitals />} />
               <Route path="/users" element={<UserManagement />} />
               <Route path="/Solicitud" element={<RequestQueue />} />
                
                {/* Ruta 404 por si alguien escribe una página que no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
