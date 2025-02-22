# Usamos node 20 con alpine para una imagen base ligera
FROM node:20-alpine AS development

# Instalamos las dependencias necesarias para desarrollo
RUN apk add --no-cache python3 make g++

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalamos todas las dependencias, incluyendo devDependencies
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto 4200 para el servidor de desarrollo
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "start"]