## Si quieres ahorrarte la instalación, puedes ver el ecommerce en shop.imjosealtuve.com

# 🛒 E-commerce Fullstack (React + Django)

Una aplicación de comercio electrónico completa construida con **Django REST Framework** en el backend y **React (Vite)** en el frontend. El proyecto incluye gestión de productos, carrito de compras y autenticación.


---

## 📋 Requisitos Previos

Asegúrate de tener instalado:
* [Python](https://www.python.org/) (v3.9 o superior)
* [Node.js](https://nodejs.org/) (v16 o superior)
* [Git](https://git-scm.com/)

---

## 🚀 Guía de Instalación

Sigue estos pasos para levantar el proyecto localmente con datos de prueba.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/imjosealtuve/ecommerce-react.git](https://github.com/imjosealtuve/ecommerce-react.git)
cd ecommerce-react
2. Configuración del Backend (API)
El backend maneja la base de datos y la lógica.

Bash
cd backend

# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno virtual
# En Windows:
.\venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Migrar la base de datos
python manage.py migrate

# 5. Cargar datos de prueba (Productos y Usuarios)
python manage.py loaddata datos_iniciales.json

# 6. Iniciar el servidor
python manage.py runserver
El backend correrá en: http://localhost:8000

3. Configuración del Frontend (Cliente)
Abre una nueva terminal en la raíz del proyecto.

Bash
cd frontend

# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
El frontend correrá en: http://localhost:5173

## 🔐 Acceso al Panel de Administración (Backend)

Este proyecto no requiere registro de usuarios en el frontend. Sin embargo, cuenta con un panel administrativo para gestionar productos y la base de datos.

Para acceder, ve a: `http://localhost:8000/admin`

* **Usuario (Superuser):** admin  <-- (Pon aquí el usuario que TÚ creaste)
* **Contraseña:** admin123      <-- (Pon aquí la clave que TÚ creaste)

*(Nota: Estas credenciales corresponden al superusuario incluido en el archivo `datos_iniciales.json`)*

🛠 Tecnologías
Frontend: React, Vite, CSS Modules.

Backend: Python, Django, Django REST Framework.

Base de Datos: SQLite (Entorno de desarrollo).

Desarrollado por Jose Altuve
