import {
  LayoutDashboard, FlaskConical, Building2, ClipboardList,
  TriangleAlert, Users, ChevronRight,
  Droplets, LogOut, TrendingUp, TrendingDown
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

// --- INSTANCIA DE AXIOS CONFIGURADA ---
// Asegúrate de que este puerto coincida con el que usa tu Laravel (usualmente 8000)
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true,
});

const CHART_DATA = [
  { type: "O+", disponible: 320 }, { type: "O-", disponible: 42 },
  { type: "A+", disponible: 285 }, { type: "A-", disponible: 98 },
  { type: "B+", disponible: 210 }, { type: "B-", disponible: 65 },
  { type: "AB+", disponible: 145 }, { type: "AB-", disponible: 33 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#F2F4F8] font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1B2333] text-white flex flex-col">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#c5111b]">
              <Droplets className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Red Vital</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Coordinación Hemática</p>
            </div>
          </div>

          <nav className="space-y-1">
            {/* Rutas configuradas según App.jsx */}
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigate('/dashboard')} active={isActive('/dashboard')} />
            <NavItem icon={<FlaskConical size={18} />} label="Gestión de Inventario" onClick={() => navigate('/inventory')} active={isActive('/inventory')} />
            <NavItem icon={<Building2 size={18} />} label="Red de Hospitales" onClick={() => navigate('/hospitals')} active={isActive('/hospitals')} />
            <NavItem icon={<ClipboardList size={18} />} label="Bandeja de Solicitudes" badge="2" />
            <NavItem icon={<TriangleAlert size={18} />} label="Alertas de Escasez" badge="3" />
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6 space-y-1">
            <NavItem icon={<Users size={18} />} label="Gestión de Usuarios" />
            <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" onClick={handleLogout} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Red Vital</span> <ChevronRight size={14} /> 
            <span className="font-bold text-gray-900">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B2333] text-white flex items-center justify-center text-xs font-bold">MA</div>
              <div className="text-sm">
                <div className="font-bold">Mónica Alcántara</div>
                <div className="text-[10px] text-purple-600">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">Resumen operativo · Red Vital</p>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <KpiCard title="UNIDADES DISPONIBLES" value="17" trend="+4.2%" up={true} />
            <KpiCard title="SOLICITUDES URGENTES" value="1" trend="atención requerida" up={true} color="text-red-600" />
            <KpiCard title="ALERTAS DE CADUCIDAD" value="11" trend="ventana crítica" up={false} />
            <KpiCard title="HOSPITALES EN RED" value="7" trend="conectados" up={true} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold mb-6">Disponibilidad por Tipo de Sangre</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CHART_DATA} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="disponible" radius={[4, 4, 0, 0]}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.disponible < 80 ? "#c5111b" : "#1B2333"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-componentes
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

const KpiCard = ({ title, value, trend, up, color = "text-green-600" }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
    <div className="text-[10px] font-bold text-gray-400 mb-2">{title}</div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className={`text-[11px] flex items-center gap-1 ${color}`}>
      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
    </div>
  </div>
);