import {
  LayoutDashboard, FlaskConical, Building2, ClipboardList,
  TriangleAlert, Users, ChevronRight,
  Droplets, LogOut, 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation(); // <--- Detecta la ruta actual

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
  console.error("Error al cerrar sesión:", error); // Esto usa la variable y te ayuda a depurar
  localStorage.removeItem('token');
  navigate('/login');
}
  };

  // Función auxiliar para saber si la ruta es la activa
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#F2F4F8] font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1B2333] text-white flex flex-col">
        {/* ... Logo (igual que en Dashboard) ... */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: "#c5111b" }}>
              <Droplets className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Red Vital</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Coordinación Hemática</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigate('/dashboard')} active={isActive('/dashboard')} />
            <NavItem icon={<FlaskConical size={18} />} label="Gestión de Inventario" onClick={() => navigate('/inventory')} active={isActive('/inventory')} />
            <NavItem icon={<Building2 size={18} />} label="Red de Hospitales" onClick={() => navigate('/hospitals')} active={isActive('/hospitals')} />
            <NavItem icon={<ClipboardList size={18} />} label="Bandeja de Solicitudes" badge="2" />
            <NavItem icon={<TriangleAlert size={18} />} label="Alertas de Escasez" badge="3" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10 space-y-1">
          <NavItem icon={<Users size={18} />} label="Gestión de Usuarios" />
          <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Red Vital</span> <ChevronRight size={14} /> 
            <span className="font-bold text-gray-900">Gestión de Inventario</span>
          </div>
          {/* ... User profile ... */}
        </header>

        <main className="p-8">
          <h1 className="text-2xl font-bold mb-6">Gestión de Inventario</h1>
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-2">
            {['Todos', 'Por Caducar', 'En Cuarentena', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((f) => (
              <button key={f} className={`px-4 py-1.5 rounded-full text-sm ${f === 'Todos' ? 'bg-[#c5111b] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase border-b">
                 <tr>
                   <th className="px-6 py-4">ID Unidad</th>
                   <th className="px-6 py-4">Tipo Sangre</th>
                   <th className="px-6 py-4">F. Extracción</th>
                   <th className="px-6 py-4">Estatus</th>
                 </tr>
               </thead>
               <tbody>
                 {/* Aquí iría el mapeo de tus datos */}
                 <tr className="border-b">
                   <td className="px-6 py-4 font-bold">RV-2026-00162</td>
                   <td className="px-6 py-4"><span className="bg-red-50 text-red-600 px-2 py-1 rounded">B-</span></td>
                   <td className="px-6 py-4">01 jun 2026</td>
                   <td className="px-6 py-4"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">En Cuarentena</span></td>
                 </tr>
               </tbody>
             </table>
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente NavItem reutilizable y mejorado
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors 
    ${active ? "bg-[#c5111b] text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
  >
    {icon} {label}
    {badge && <span className="ml-auto bg-red-600 text-[10px] px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);