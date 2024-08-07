# Dockerfile for Authentication Microservice

FROM node:20


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install

RUN npm ins -g nodemon


COPY . .

# Exposer le port que votre application utilise
EXPOSE 8081

# Démarrer l'application
CMD [ "npm", "run" , "dev" ]
