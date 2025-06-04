# 🥙 Shawarma Express

Sistema completo de pedidos de comida para un restaurante de shawarma, que incluye:

## 🏗️ Estructura del Proyecto

El proyecto está dividido en tres partes principales:

### 1. Frontend
- React.js con Vite
- Tailwind CSS para estilos
- Interfaz moderna y responsive
- Sistema de carrito de compras
- Gestión de pedidos en tiempo real

### 2. Backend
- Node.js con Express
- MongoDB para la base de datos
- API RESTful
- Gestión de menú y pedidos
- Sistema de autenticación

### 3. Bot de Telegram
- Node.js con Telegraf
- Integración con el sistema de pedidos
- Menú interactivo
- Seguimiento de pedidos
- Notificaciones en tiempo real

## 🚀 Configuración y Despliegue

### Variables de Entorno

Cada parte del proyecto requiere su propio archivo `.env`:

#### Backend
```env
PORT=5000
MONGODB_URI=tu_uri_de_mongodb
```

#### Frontend
```env
VITE_API_URL=http://localhost:5000
```

#### Bot de Telegram
```env
BOT_TOKEN=tu_token_de_telegram
MONGODB_URI=tu_uri_de_mongodb
BACKEND_URL=http://localhost:5000
PORT=5000
```

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/shawarma-express.git
cd shawarma-express
```

2. Instala las dependencias en cada directorio:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Bot de Telegram
cd ../telegram-bot
npm install
```

3. Configura las variables de entorno:
- Crea un archivo `.env` en cada directorio siguiendo los ejemplos anteriores

4. Inicia los servicios:
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev

# Bot de Telegram
cd telegram-bot
npm start
```

## 📱 Uso del Bot de Telegram

1. Busca el bot en Telegram: `@ShawarmaExpressBot`
2. Comandos disponibles:
   - `/start` - Iniciar el bot
   - `/menu` - Ver el menú disponible
   - `/pedir` - Realizar un pedido
   - `/estado` - Ver estado de pedidos
   - `/micuenta` - Ver información de la cuenta

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Bot**: Node.js, Telegraf
- **Despliegue**: Render, MongoDB Atlas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
