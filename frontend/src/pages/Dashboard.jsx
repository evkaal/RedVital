//import { useState } from "react";
import { 
  LayoutDashboard, FlaskConical, Building2, ClipboardList, 
  TriangleAlert, Users, Search, Bell, ChevronRight, TrendingUp, TrendingDown 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Cell 
} from "recharts";


const CHART_DATA = [
  { type: "O+", disponible: 320 },
  { type: "O-", disponible: 42 },
  { type: "A+", disponible: 285 },
  { type: "A-", disponible: 98 },
  { type: "B+", disponible: 210 },
  { type: "B-", disponible: 65 },
  { type: "AB+", disponible: 145 },
  { type: "AB-", disponible: 33 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#F2F4F8] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1B2333] text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-600 p-2 rounded-lg">🩸</div>
            <div>
              <div className="font-bold">Red Vital</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">Coordinación Hemática</div>
            </div>
          </div>
          
          <div className="mb-6 bg-[#0f1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-red-500 font-bold uppercase">Admin</div>
            <div className="text-xs">Administrador</div>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
            <NavItem icon={<FlaskConical size={18}/>} label="Gestión de Inventario" />
            <NavItem icon={<Building2 size={18}/>} label="Red de Hospitales" />
            <NavItem icon={<ClipboardList size={18}/>} label="Bandeja de Solicitudes" badge="2" />
            <NavItem icon={<TriangleAlert size={18}/>} label="Alertas de Escasez" badge="3" />
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/10">
          <NavItem icon={<Users size={18}/>} label="Gestión de Usuarios" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Red Vital</span> <ChevronRight size={14}/> <span className="font-bold text-gray-900">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar en Red Vital..." className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none w-64" />
            </div>
            <div className="bg-gray-200 p-2 rounded-lg"><Bell size={18} /></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B2333] text-white flex items-center justify-center text-xs font-bold">MA</div>
              <div className="text-sm">
                <div className="font-bold">Mónica Alcántara</div>
                <div className="text-[10px] text-purple-600">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">Resumen operativo · Red Vital · domingo, 12 de julio</p>

          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <KpiCard title="UNIDADES DISPONIBLES" value="17" trend="+4.2% vs. semana anterior" up={true} />
            <KpiCard title="SOLICITUDES URGENTES" value="1" trend="activas requieren atención" up={true} color="text-red-600" />
            <KpiCard title="ALERTAS DE CADUCIDAD" value="11" trend="≤7 días ventana crítica" up={false} />
            <KpiCard title="HOSPITALES EN RED" value="7" trend="100% todos conectados" up={true} />
          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold mb-6">Disponibilidad por Tipo de Sangre</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CHART_DATA} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <ReferenceLine y={80} stroke="red" strokeDasharray="3 3" />
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

// Sub-componentes para limpiar el código
const NavItem = ({ icon, label, active, badge }) => (
  <button className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${active ? 'bg-red-900/30 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
    {icon} {label} {badge && <span className="ml-auto bg-red-600 text-[10px] px-2 py-0.5 rounded-full">{badge}</span>}
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