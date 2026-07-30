
import {
  LayoutDashboard, FlaskConical, Building2, Users as UsersIcon, ChevronRight,
  Droplets, Check, X, AlertTriangle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const requestsData = [
  { id: "SOL-2026-0041", date: "12-jul, 07:30 a.m.", hospital: "H. General del Norte", doctor: "Dr. Eduardo Torres", type: "O-", quantity: 3, urgency: "Alta", status: "Pendiente" },
  { id: "SOL-2026-0040", date: "12-jul, 06:45 a.m.", hospital: "H. Civil de Guadalajara", doctor: "Dra. Sandra Ibáñez", type: "A+", quantity: 2, urgency: "Media", status: "Pendiente" },
  { id: "SOL-2026-0039", date: "11-jul, 10:00 p.m.", hospital: "IMSS CMN Siglo XXI", doctor: "Dr. Raúl Medina", type: "O+", quantity: 5, urgency: "Alta", status: "En Tránsito" },
  { id: "SOL-2026-0038", date: "11-jul, 02:00 p.m.", hospital: "H. IMSS Monterrey", doctor: "Dra. Claudia Reyes", type: "AB+", quantity: 1, urgency: "Baja", status: "Entregada" },
  { id: "SOL-2026-0037", date: "11-jul, 10:00 a.m.", hospital: "H. Ángeles Puebla", doctor: "Dr. Marco Salinas", type: "B+", quantity: 2, urgency: "Media", status: "Aprobada" },
  { id: "SOL-2026-0036", date: "10-jul, 03:15 a.m.", hospital: "H. General del Norte", doctor: "Dr. Eduardo Torres", type: "O-", quantity: 4, urgency: "Alta", status: "Entregada" },
  { id: "SOL-2026-0035", date: "09-jul, 11:00 a.m.", hospital: "IMSS CMN Siglo XXI", doctor: "Dr. Arturo Peña", type: "A-", quantity: 2, urgency: "Media", status: "Rechazada" },
  { id: "SOL-2026-0034", date: "08-jul, 09:00 a.m.", hospital: "H. Regional ISSSTE", doctor: "Dra. Carmen López", type: "B-", quantity: 1, urgency: "Baja", status: "Entregada" },
];

export default function RequestQueue() {
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
            <NavItem icon={<UsersIcon size={18}/>} label="Bandeja de Solicitudes" onClick={() => navigate('/requests')} active={isActive('/requests')} />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Red Vital</span> <ChevronRight size={14} /> 
                <span className="font-bold text-gray-900">Bandeja de Solicitudes</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                    <AlertTriangle size={14}/> 2 pendientes
                </div>
            </div>
        </header>

        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Bandeja de Solicitudes</h1>
            <p className="text-sm text-gray-500">8 solicitudes · 2 pendientes de aprobación</p>
          </div>

          <table className="w-full bg-white rounded-xl border border-gray-200 shadow-sm">
            <thead className="text-[10px] text-gray-500 uppercase border-b text-left">
              <tr>
                <th className="px-6 py-4">ID Solicitud</th>
                <th className="px-6 py-4">Hospital Solicitante</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Cant.</th>
                <th className="px-6 py-4">Urgencia</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {requestsData.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{req.id}</div>
                    <div className="text-[10px] text-gray-400">{req.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{req.hospital}</div>
                    <div className="text-[10px] text-gray-400">{req.doctor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{req.type}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">{req.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${req.urgency === 'Alta' ? 'bg-red-100 text-red-600' : req.urgency === 'Media' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {req.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${req.status === 'Pendiente' ? 'text-orange-600' : req.status === 'Rechazada' ? 'text-red-500' : 'text-green-600'}`}>
                        <span className={`w-2 h-2 rounded-full ${req.status === 'Pendiente' ? 'bg-orange-500' : req.status === 'En Tránsito' ? 'bg-blue-500' : req.status === 'Rechazada' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {req.status === 'Pendiente' && (
                        <div className="flex gap-2">
                            <button className="bg-emerald-600 text-white px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-700">
                                <Check size={12}/> Aprobar y Despachar
                            </button>
                            <button className="border border-red-200 text-red-600 px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 hover:bg-red-50">
                                <X size={12}/> Rechazar
                            </button>
                        </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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