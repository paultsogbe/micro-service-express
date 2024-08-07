# Dockerfile for API Gateway

# Utiliser l'image de base officielle Node.js
FROM node:20

# Créer et définir le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install -g nodemon

# Copier le reste du code de l'application
COPY . .

# Exposer le port que votre application utilise
EXPOSE 3000

# Démarrer l'application
CMD [ "npm", "run" , "dev" ]
