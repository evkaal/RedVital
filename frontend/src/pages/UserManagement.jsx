import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FlaskConical, Building2, Users as UsersIcon, Search, Bell, ChevronRight,
  Droplets, LogOut, X, UserPlus   
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000/api', withCredentials: true });

export default function UserManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('redVital_users');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Mónica Alcántara", email: "m.alcantara@salud.gob.mx", role: "Administrador", status: "Activo" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('redVital_users', JSON.stringify(users));
  }, [users]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Activo"
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', role: '' });
  };

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
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#c5111b]"><Droplets className="text-white" size={24} /></div>
            <div><h1 className="font-bold text-lg">Red Vital</h1></div>
          </div>
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} active={isActive('/dashboard')} />
            <NavItem icon={<FlaskConical size={18}/>} label="Inventario" onClick={() => navigate('/inventory')} active={isActive('/inventory')} />
            <NavItem icon={<Building2 size={18}/>} label="Hospitales" onClick={() => navigate('/hospitals')} active={isActive('/hospitals')} />
            <NavItem icon={<UsersIcon size={18}/>} label="Gestión de Usuarios" onClick={() => navigate('/users')} active={isActive('/users')} />
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/10">
            <NavItem icon={<LogOut size={18}/>} label="Cerrar Sesión" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Red Vital</span> <ChevronRight size={14} /> 
                <span className="font-bold text-gray-900">Gestión de Usuarios</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none w-48" />
                </div>
                <Bell size={20} className="text-gray-500" />
            </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#1B2333] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <UserPlus size={16}/> + Nuevo Usuario
            </button>
          </div>

          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead className="text-xs text-gray-500 uppercase border-b text-left">
              <tr><th className="px-6 py-4">Usuario</th><th className="px-6 py-4">Correo</th><th className="px-6 py-4">Rol</th><th className="px-6 py-4">Estatus</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-4 font-bold">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.role}</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{user.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[400px]">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Agregar Nuevo Usuario</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3">
                <input type="text" placeholder="Nombre completo" className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="tel" placeholder="Número de teléfono" className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <select className="w-full p-2 border rounded" required onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="">Seleccionar Cargo</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Médico Solicitante">Médico Solicitante</option>
                    <option value="Gestor de Banco">Gestor de Banco</option>
                </select>
                <button type="submit" className="w-full p-2 bg-[#c5111b] text-white rounded font-bold mt-4">Guardar Usuario</button>
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
