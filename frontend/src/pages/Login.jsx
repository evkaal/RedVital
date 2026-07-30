import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importa esto
import { Eye, EyeOff, Shield, ChevronRight, Droplets } from "lucide-react";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState("gestor");
  const navigate = useNavigate();

  // Cambiamos 'e: React.FormEvent' por solo 'e'
  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/dashboard');
  };
  return (
    // Contenedor principal: pantalla completa, flex
    <div className="flex h-screen w-full bg-white font-sans">
      {/* PANEL IZQUIERDO (Oscuro) */}
      <div
        className="hidden lg:flex w-5/12 flex-col justify-between p-16"
        style={{ backgroundColor: "#1a1f2c", color: "white" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-20">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: "#c5111b" }}
            >
              <Droplets className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Proyecto Red Vital</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Coordinación Hemática
              </p>
            </div>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Plataforma de
            <br />
            Coordinación Hemática
          </h2>
         
        </div>

        <div className="flex gap-12 border-t border-slate-700 pt-8">
          <div>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-slate-500 uppercase">Hospitales</p>
          </div>
          <div>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-slate-500 uppercase">Donaciones</p>
          </div>
          <div>
            <div className="text-2xl font-bold">18,320</div>
            <p className="text-xs text-slate-500 uppercase">Stock</p>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO (Login) */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-4 text-[#c5111b]">
            <Shield size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Acceso Institucional
            </span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Red Vital</h2>
          <p className="text-slate-500 mb-8">
            Ingrese sus credenciales para acceder al Sistema.
          </p>

          {/* Selector de Rol */}
          <div className="flex gap-2 mb-6">
            {[].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r.toLowerCase())}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${role === r.toLowerCase() ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-500"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
      {/* Input Correo */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Correo institucional
        </label>
        <input
          type="email"
          className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-none"
          placeholder="usuario@hospital.com"
        />
      </div>

      {/* Input Contraseña */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-4 top-4 text-slate-400"
            onClick={() => setShowPwd(!showPwd)}
          >
            {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full text-white font-bold p-4 rounded-xl hover:opacity-90 transition-opacity d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#c5111b" }}
      >
        Ingresar al Sistema
        <ChevronRight size={20} className="ms-2" />
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}
