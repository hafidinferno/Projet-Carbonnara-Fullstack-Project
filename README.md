# Carbonara
> **BERTHOLON Noah** p2002981<br>
> **BONHOTAL Jules** p20033042<br>
> **BOUAMAMA Youssef** p2306151<br>
> **CHEN Olivia** p2310067<br>
> **DANOUN Hayet** p1925003<br>
> **OUCOUC Hafid** p2313657<br>

## Développement
Le serveur utilise une combinaison de React et Express pour le front et le back-end.

### Installation

Pour la **première utilisation**, il faudra cloner le dépot, renommer le dossier `src` temporairement le temps d'initialiser une application React au nom de `src` (pour pouvoir push et pull sans problème), et remettre tous les fichiers aux bons endroit.<br>
Pour cela: 

```bash
git clone git@forge.univ-lyon1.fr:mif10-grp101/mif10.git
cd mif10
npx create-react-app src
mv tmp/node_modules src
rm -rf tmp
```

Puis il faut installer toutes les dépendances nécessaires aux serveurs.

```bash
npm install react react-dom react-router-dom vite @vitejs/plugin-react express cors prop-types node-fetch@2 axios pg react-chartjs-2
```

### Configuration

Dans le fichier `package.json` créé dans `src` il faut ajouter les lignes suivantes:

```json
"scripts": {
    "dev": "vite",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr frontend/server-entry.jsx --outDir dist/server",
    "build": "npm run build:client && npm run build:server",
    "serve": "node backend/server.cjs"
  }
```

Pour le développement, seul la ligne `"dev"` est vraiment intéressante. Le reste sert à build le serveur pour le déployer sur la VM.

### Exécution

Pour lancer le client frontend :
```bash
npm run dev
```

Pour lancer le serveur backend :
```bash
node server-dev.js
```