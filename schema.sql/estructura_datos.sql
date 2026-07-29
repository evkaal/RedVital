

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE hospitales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    telefono VARCHAR(20),
    contacto_email VARCHAR(100),
    estatus_activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INT,
    hospital_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (hospital_id) REFERENCES hospitales(id)
);

CREATE TABLE tipos_sangre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(5) NOT NULL,
    factor_rh VARCHAR(5)
);

CREATE TABLE cat_estatus_unidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE unidades_sangre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_sangre_id INT,
    hospital_origen_id INT,
    fecha_extraccion TIMESTAMP,
    fecha_caducidad TIMESTAMP,
    estatus_unidad_id INT,
    FOREIGN KEY (tipo_sangre_id) REFERENCES tipos_sangre(id),
    FOREIGN KEY (hospital_origen_id) REFERENCES hospitales(id),
    FOREIGN KEY (estatus_unidad_id) REFERENCES cat_estatus_unidades(id)
);

CREATE TABLE cat_estatus_ordenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE ordenes_solicitud (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_solicitante_id INT,
    usuario_solicitante_id INT,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urgencia_nivel INT,
    estatus_orden_id INT,
    FOREIGN KEY (hospital_solicitante_id) REFERENCES hospitales(id),
    FOREIGN KEY (usuario_solicitante_id) REFERENCES usuarios(id),
    FOREIGN KEY (estatus_orden_id) REFERENCES cat_estatus_ordenes(id)
);

CREATE TABLE orden_detalle (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT,
    unidad_id INT,
    FOREIGN KEY (orden_id) REFERENCES ordenes_solicitud(id),
    FOREIGN KEY (unidad_id) REFERENCES unidades_sangre(id)
);

CREATE TABLE historial_notificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT,
    tipo_canal VARCHAR(50),
    mensaje TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (orden_id) REFERENCES ordenes_solicitud(id)
);



-- 1. CATÁLOGOS BASE
-- Roles
USE red_vital;

INSERT INTO roles (nombre, descripcion) VALUES ('Administrador', 'Acceso total al sistema');
INSERT INTO roles (nombre, descripcion) VALUES ('Gestor', 'Gestión de inventario y solicitudes');
INSERT INTO roles (nombre, descripcion) VALUES ('Medico', 'Solicitud de unidades');

-- Tipos de sangre
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('O', '+');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('O', '-');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('A', '+');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('A', '-');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('B', '+');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('B', '-');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('AB', '+');
INSERT INTO tipos_sangre (nombre, factor_rh) VALUES ('AB', '-');

-- Estatus unidades
INSERT INTO cat_estatus_unidades (nombre) VALUES ('Disponible');
INSERT INTO cat_estatus_unidades (nombre) VALUES ('Asignada');
INSERT INTO cat_estatus_unidades (nombre) VALUES ('Caducada');
INSERT INTO cat_estatus_unidades (nombre) VALUES ('Utilizada');

-- Estatus órdenes
INSERT INTO cat_estatus_ordenes (nombre) VALUES ('Pendiente');
INSERT INTO cat_estatus_ordenes (nombre) VALUES ('En Proceso');
INSERT INTO cat_estatus_ordenes (nombre) VALUES ('Completada');
INSERT INTO cat_estatus_ordenes (nombre) VALUES ('Cancelada');

-- 2. HOSPITALES
INSERT INTO hospitales (nombre, direccion, ciudad, telefono, contacto_email, estatus_activo) 
VALUES ('Hospital Central', 'Av. Reforma 123', 'Oaxaca', '9511234567', 'contacto@hcentral.gob', TRUE);
INSERT INTO hospitales (nombre, direccion, ciudad, telefono, contacto_email, estatus_activo) 
VALUES ('Clínica Regional Norte', 'Calle 5 de Mayo 45', 'Oaxaca', '9517654321', 'info@crnorte.gob', TRUE);

-- 3. USUARIOS
-- Nota: Password hasheado genérico (Laravel)
INSERT INTO usuarios (nombre, email, password, rol_id, hospital_id) 
VALUES ('Mónica Alcántara', 'monica@redvital.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1);
INSERT INTO usuarios (nombre, email, password, rol_id, hospital_id) 
VALUES ('Juan Pérez', 'juan@gestor.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 1);

-- 4. UNIDADES DE SANGRE
-- Usando ids correspondientes a los inserts previos
INSERT INTO unidades_sangre (tipo_sangre_id, hospital_origen_id, fecha_extraccion, fecha_caducidad, estatus_unidad_id) 
VALUES (1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1);
INSERT INTO unidades_sangre (tipo_sangre_id, hospital_origen_id, fecha_extraccion, fecha_caducidad, estatus_unidad_id) 
VALUES (3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1);
INSERT INTO unidades_sangre (tipo_sangre_id, hospital_origen_id, fecha_extraccion, fecha_caducidad, estatus_unidad_id) 
VALUES (2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), 1);

-- 5. ORDENES DE SOLICITUD
INSERT INTO ordenes_solicitud (hospital_solicitante_id, usuario_solicitante_id, urgencia_nivel, estatus_orden_id) 
VALUES (2, 2, 3, 1);