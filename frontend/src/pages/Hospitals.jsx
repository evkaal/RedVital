
import {
  LayoutDashboard, FlaskConical, Building2, Users as UsersIcon, Search, Bell, ChevronRight,
  Droplets, MapPin, Phone, User, Plus
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const hospitalsData = [
  { id: 1, name: "H. General del Norte", region: "Norte", status: "Activo", uds: "312", address: "Av. Gonzalitos 235 Norte, Monterrey, NL", phone: "81-8329-1000", doctor: "Dr. Carlos Mendoza" },
  { id: 2, name: "H. Civil de Guadalajara", region: "Bajío", status: "Activo", uds: "498", address: "Calle Hospital 278, Guadalajara, JAL", phone: "33-3614-7900", doctor: "Dra. Ana Ramírez" },
  { id: 3, name: "IMSS CMN Siglo XXI", region: "Centro", status: "Activo", uds: "489", address: "Av. Cuauhtémoc 330, Ciudad de México", phone: "55-5627-6900", doctor: "Dr. Javier Ortega" },
  { id: 4, name: "H. IMSS Monterrey", region: "Norte", status: "Activo", uds: "198", address: "Av. Lincoln 4545, Monterrey, NL", phone: "81-8348-2000", doctor: "Dra. Laura Serrano" },
  { id: 5, name: "H. Ángeles Puebla", region: "Centro", status: "Activo", uds: "165", address: "Calle 14 Sur 3905, Puebla, PUE", phone: "22-2303-6000", doctor: "Dr. Roberto Vega" },
  { id: 6, name: "H. Regional ISSSTE", region: "Centro", status: "Activo", uds: "221", address: "Av. Insurgentes Sur 3700, CDMX", phone: "55-5200-6400", doctor: "Dra. María Fuentes" },
  { id: 7, name: "H. General de Mérida", region: "Sureste", status: "Inactivo", uds: "0", address: "Calle 59 No. 524, Mérida, YUC", phone: "99-9930-3370", doctor: "Dr. Alberto Chan" },
  { id: 8, name: "H. Cruz Roja Tijuana", region: "Norte", status: "Activo", uds: "88", address: "Calle Sirak Baloyan 12227, Tijuana, BC", phone: "66-4684-0640", doctor: "Dra. Patricia Soto" },
];

export default function Hospitals() {
  const navigate = useNavigate();
  const location = useLocation();
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
            <NavItem icon={<Building2 size={18}/>} label="Red de Hospitales" onClick={() => navigate('/hospitals')} active={isActive('/hospitals')} />
            <NavItem icon={<UsersIcon size={18}/>} label="Gestión de Usuarios" onClick={() => navigate('/users')} active={isActive('/users')} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Red Vital</span> <ChevronRight size={14} /> 
                <span className="font-bold text-gray-900">Red de Hospitales</span>
            </div>
            <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-500" />
            </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Red de Hospitales</h1>
              <p className="text-sm text-gray-500">7 activos · 1 inactivos</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input type="text" placeholder="Buscar hospital..." className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none w-64" />
              </div>
              <button className="bg-[#1B2333] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <Plus size={16}/> Agregar Hospital
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {hospitalsData.map((h) => (
              <div key={h.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg"><Building2 size={20} className="text-gray-600"/></div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${h.region === 'Norte' ? 'bg-blue-100 text-blue-700' : h.region === 'Bajío' ? 'bg-green-100 text-green-700' : h.region === 'Centro' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>{h.region}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{h.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${h.status === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs font-medium text-gray-600">{h.status}</span>
                    <span className="text-xs text-gray-400">· {h.uds} uds</span>
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2"><MapPin size={14}/> {h.address}</div>
                    <div className="flex items-center gap-2"><Phone size={14}/> {h.phone}</div>
                    <div className="flex items-center gap-2"><User size={14}/> {h.doctor}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm ${active ? "bg-[#c5111b] text-white" : "text-gray-400 hover:bg-gray-800"}`}>
    {icon} {label}
  </button>
);