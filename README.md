# RedVital - Sistema de Gestión de Banco de Sangre

##  Descripción

Sistema de gestión logística para la distribución de componentes sanguíneos entre bancos de sangre y hospitales. Desarrollado como parte del proyecto final de la materia Programación Web.

##  Integrantes

- **Azael Hernandez Uvera**

##  Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Laravel** | 10.x | Backend (API REST) |
| **Laravel Sanctum** | - | Autenticación por tokens |
| **React** | 18.x | Frontend (SPA) |
| **Vite** | 8.x | Empaquetador de frontend |
| **MySQL** | 8.0 | Base de datos |
| **Nginx** | 1.24 | Servidor web |
| **Ubuntu** | 22.04 | Sistema operativo (VPS) |
| **Bruno** | - | Pruebas de API |

---

##  Endpoints de la API

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Registrar un nuevo usuario | ❌ No |
| POST | `/api/login` | Iniciar sesión y obtener token | ❌ No |
| POST | `/api/logout` | Cerrar sesión | ✅ Sí |
| GET | `/api/hospitales` | Listar hospitales | ✅ Sí |
| POST | `/api/hospitales` | Crear hospital | ✅ Sí |
| GET | `/api/hospitales/{id}` | Ver hospital | ✅ Sí |
| PUT | `/api/hospitales/{id}` | Actualizar hospital | ✅ Sí |
| DELETE | `/api/hospitales/{id}` | Eliminar hospital | ✅ Sí |
| GET | `/api/usuarios` | Listar usuarios | ✅ Sí |
| POST | `/api/usuarios` | Crear usuario | ✅ Sí |
| GET | `/api/usuarios/{id}` | Ver usuario | ✅ Sí |
| PUT | `/api/usuarios/{id}` | Actualizar usuario | ✅ Sí |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario | ✅ Sí |
| GET | `/api/unidades-sangre` | Listar unidades de sangre | ✅ Sí |
| POST | `/api/unidades-sangre` | Crear unidad de sangre | ✅ Sí |
| GET | `/api/unidades-sangre/{id}` | Ver unidad de sangre | ✅ Sí |
| PUT | `/api/unidades-sangre/{id}` | Actualizar unidad de sangre | ✅ Sí |
| DELETE | `/api/unidades-sangre/{id}` | Eliminar unidad de sangre | ✅ Sí |

---

##  Credenciales de acceso

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Administrador** | `admin@redvital.com` | `password` |

---

## 🛠️ Instalación local

### Requisitos previos
- PHP 8.1 o superior
- Composer
- Node.js 18+
- MySQL 8.0
- XAMPP / Laragon (entorno local)

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/evkaal/RedVital.git
cd RedVital

# 2. Configurar el backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# 3. Configurar el frontend
cd ../frontend
npm install
npm run build

# 4. Levantar el servidor (local)
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontend
npm run dev
