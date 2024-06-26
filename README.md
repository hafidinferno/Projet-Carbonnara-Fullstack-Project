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
mv src tmp
npx create-react-app src
rm -rf src/public src/src src/README.md
mv tmp/* tmp/.gitignore src
rmdir tmp
```

Puis il faut installer toutes les dépendances nécessaires aux serveurs.

```bash
cd src
npm install react react-dom react-router-dom vite @vitejs/plugin-react express cors prop-types node-fetch@2 axios pg react-chartjs-2 chartjs-plugin-datalabels jspdf html2canvas
npm install chartjs-plugin-datalabels
npm install jspdf html2canvas
```

### Configuration

Dans le fichier `package.json` créé dans `src` il faut ajouter les lignes suivantes:

```json
"type": "module",
"scripts": {
    "dev": "vite",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr frontend/server-entry.jsx --outDir dist/server",
    "build": "npm run build:client && npm run build:server",
    "serve": "node ./server-dev.cjs"
  }
```

Il faudra également créer dans `src` les deux fichiers de configuration d'environnement suivant:

```js
//bd.cjs
module.exports = {
    "database": "mif10",
    "user": "utilisateur-db",
    "password": "mot de passe de votre utilisateur",
    "host": "ip (localhost ou adresse VM)",
    "port": "port de la machine (5432 à priori)"
}
```

```js
// config.cjs
module.exports = {
    cert_path: 'chemin_vers_le_fichier_de_cert_ssl',
    key_path: 'chemin_vers_le_fichier_de_clef_ssl',
    http_port: /*  port 1 */,
    https_port: /* port 2 */
}
```

### Exécution

Pour lancer uniquement le client frontend :
```bash
npm run dev
```

Pour lancer le serveur complet :
```bash
node server-dev.js
```
ou
```bash
npm run serve
```

# Notes diverses
La VM a pour IP : [`192.168.75.17`](https://192.168.75.17)<br>
Une version de l'application tourne dessus.

Pour une raison inconnue le serveur de production ne fonctionne pas.
C'est sûrement une erreur simple, mais par manque de temps nous nous sommes concentré sur le reste.