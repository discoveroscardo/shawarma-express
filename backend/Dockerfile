# backend/Dockerfile

FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y cachear instalación
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 5000

# Comando de arranque
CMD ["node", "index.js"]
