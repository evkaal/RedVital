import { useState } from 'react';
import {
  LayoutDashboard, FlaskConical, Building2,
  Droplets, LogOut, TrendingUp, TrendingDown, X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true,
});

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [units, setUnits] = useState([
    { id: "RV-2026-00162", type: "B-", extracted: "01 jun 2026", expiry: "13 jul 2026", hospital: "H. General del Norte", status: "En Cuarentena" },
  ]);

  const [formData, setFormData] = useState({
    type: 'O+', extracted: '', expiry: '', hospital: 'H. General del Norte', status: 'Disponible'
  });

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

  const handleRegister = (e) => {
    e.preventDefault();
    const newUnit = {
      id: `RV-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      type: formData.type,
      extracted: formData.extracted,
      expiry: formData.expiry,
      hospital: formData.hospital,
      status: formData.status
    };
    setUnits([newUnit, ...units]);
    setIsModalOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#F2F4F8] font-sans">
      <aside className="w-64 bg-[#1B2333] text-white flex flex-col">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#c5111b]"><Droplets className="text-white" size={24} /></div>
            <div><h1 className="font-bold text-lg">Red Vital</h1></div>
          </div>
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigate('/dashboard')} active={isActive('/dashboard')} />
            <NavItem icon={<FlaskConical size={18} />} label="Gestión de Inventario" onClick={() => navigate('/inventory')} active={isActive('/inventory')} />
            <NavItem icon={<Building2 size={18} />} label="Red de Hospitales" onClick={() => navigate('/hospitals')} active={isActive('/hospitals')} />
          </nav>
          <div className="mt-auto border-t border-white/10 pt-6 space-y-1">
            <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" onClick={handleLogout} />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="p-8">
          
          {/* ESTA ES LA PARTE CORREGIDA: Título y Botón Juntos */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h1>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-[#c5111b] hover:bg-red-800 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
            >
                + Nueva Unidad
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
                <span className="text-gray-500 text-sm">Entradas recientes</span>
                <span className="text-green-600 flex items-center gap-1 font-bold"><TrendingUp size={16} /> +12%</span>
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
                <span className="text-gray-500 text-sm">Próximas a caducar</span>
                <span className="text-red-600 flex items-center gap-1 font-bold"><TrendingDown size={16} /> 5 unidades</span>
            </div>
          </div>

          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead className="text-xs text-gray-500 uppercase border-b text-left">
              <tr>
                <th className="px-6 py-4">ID Unidad</th>
                <th className="px-6 py-4">Tipo Sangre</th>
                <th className="px-6 py-4">F. Extracción</th>
                <th className="px-6 py-4">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 font-bold">{unit.id}</td>
                  <td className="px-6 py-4"><span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs">{unit.type}</span></td>
                  <td className="px-6 py-4">{unit.extracted}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs ${unit.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{unit.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[450px]">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Nueva Unidad</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleRegister} className="space-y-3">
                <select className="w-full p-2 border rounded" onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>O+</option><option>O-</option><option>A+</option><option>B+</option><option>B-</option>
                </select>
                <input type="date" className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, extracted: e.target.value})} />
                <input type="date" className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
                <button type="submit" className="w-full bg-[#c5111b] text-white py-2 rounded-lg font-bold">Registrar Unidad</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm ${active ? "bg-[#c5111b] text-white" : "text-gray-400 hover:bg-gray-800"}`}>
    {icon} {label}
  </button>
);