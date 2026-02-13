# 1. On part d'une image existante (l'OS avec Node déjà installé)
FROM node:18-alpine

# 2. On définit le dossier de travail dans le conteneur
WORKDIR /app

# 3. On copie les fichiers de dépendances et on installe
COPY package.json .
RUN npm install

# 4. On copie le reste du code source
COPY . .

# 5. On expose le port sur lequel l'app écoute
EXPOSE 3000

# 6. La commande de lancement
CMD ["npx", "nodemon", "app.js"]