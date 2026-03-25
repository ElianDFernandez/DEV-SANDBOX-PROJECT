# DEV-SANDBOX-PROJECT 📦

> Repositorio de desarrollo de proyecto personal enfocado en la gestión de stock y cálculo de costos de productos.

## 🚀 Sobre el proyecto
Este sandbox es un espacio de práctica de desarrollo con una finalidad 100% funcional. El objetivo principal es construir una herramienta robusta que permita a emprendimientos o tiendas de llevar un control exacto de su inventario y automatizar procesos de cálculo de costos, facilitando la toma de decisiones y optimizando la gestión del negocio.

## 📋 Funcionalidades Core (MVP)
- [ ] **Catálogo de Productos:** Alta, baja y modificación (ABM) de artículos.
- [ ] **Control de Stock:** Registro de entradas, salidas y ajustes de inventario.
- [ ] **Motor de Costos:** Cálculo de precios de venta finales basados en costos de proveedores, impuestos y márgenes de ganancia.
- [ ] **Alertas:** Notificaciones visuales para productos con stock bajo.

## 🛠️ Stack Tecnológico
- **Backend / Framework:** PHP con Laravel
- **Frontend:** React con Vite
- **Base de Datos:** MySQL

## ⚙️ Instalación y Uso
1. Clonar este repositorio:
   ```bash
   git clone [https://github.com/ElianDFernandez/DEV-SANDBOX-PROJECT.git](https://github.com/ElianDFernandez/DEV-SANDBOX-PROJECT.git)
   ```
1. Instalación de dependencias y levantado de contenedores:
   ```
   docker compose up -d --build
   ```
2. Acceder al contenedor backend para instalar dependencias:
   ```
   docker exec -it sandbox_backend bash
   composer install
   chown -R www-data:www-data storage bootstrap/cache
   chmod -R 775 storage bootstrap/cache
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   exit
   ```
0. Accesos:
   ```
   🎨Frontend: http://localhost:5174
   🐬phpMyAdmin: http://localhost:8081 
   🧠Backend: http://localhost:8001
   ```
   