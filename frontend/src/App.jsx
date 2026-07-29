import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirección raíz al login */}
                <Route path="/" element={<Navigate to="/login" />} />
                
                {/* Rutas Públicas */}
                <Route path="/login" element={<Login />} />
                
                {/* Rutas Protegidas (Aquí cargará tu dashboard) */}
                <Route path="/dashboard" element={<Dashboard />} /><Route path="/dashboard" element={<Dashboard />} />
                {/* Ruta 404 por si alguien escribe una página que no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;