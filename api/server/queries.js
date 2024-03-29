const Pool = require('pg').Pool
const cors = require("cors");

const pool = new Pool({
  user: 'p2310067',
  host: '192.168.75.17',
  database: 'mif10',
  password: 'tmppswd',
  port: 5432,
})

pool.connect(function(err) {
  if(err) throw err;
  console.log("Database connected!");
});

//TODO : GET carbone du thématique séléctionné
const getCarbonne = (req, res) => {

}

const deleteData = async (req, res) => {
  try {
    // Suppression de tout dans les tables
    await pool.query(`
    DELETE FROM "numerique";
    DELETE FROM "repas";
    DELETE FROM "boisson";
    DELETE FROM "transport";
    DELETE FROM "habillement";
    DELETE FROM "electromenager";
    DELETE FROM "mobilier";
    DELETE FROM "chauffage";
    DELETE FROM "fruitsetlegumes";
    DELETE FROM "habillement";
    DELETE FROM "usagenumerique";
  `);
    res.send("Tout a été supprimé dans les tables et un nouveau token a été obtenu.");
  } catch (error) {
    console.error('Erreur lors de la migration:', error);
    res.status(500).json({error: error.message});
  }
}

const createTables = async (req, res) => {
  try {
    //Création des tables
    await pool.query(`
    CREATE TABLE repas (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE boisson (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE transport (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE habillement (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE electromenager (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE mobilier (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE chauffage (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE fruitsetlegumes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE usagenumerique (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
    
    CREATE TABLE numerique (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        slug VARCHAR(255),
        ecv FLOAT8,
        footprint FLOAT8
    );
  `);
  res.send("Tout a été fait");
  } catch (error) {
    console.error('Erreur création des tables', error);
    res.status(500).json({error: error.message});
  }
}

const insertAll = async (req, res) => {
  try {
    for (let i = 0; i < 10; i++) {
      await tables(thematiques[i],i+1)
    }
    res.status(200).send('good all')
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur du serveur');
  }
}

const columnsTables = [
  'id', 'name', 'slug','ecv','footprint'
];

const thematiques = [
  "numerique",
  "repas",
  "boisson",
  "transport",
  "habillement",
  "electromenager",
  "mobilier",
  "chauffage",
  "fruitsetlegumes",
  "usagenumerique"
];

var j=1

async function tables(thematiques,ii) {
  let url = `https://impactco2.fr/api/v1/thematiques/ecv/${ii}?detail=1`;

  let options = {
    method: 'GET',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    let response = await fetch(url, options);

    const data = await response.json()

    let NumeriquePromises = data.data.map(num => {
        return {
            id : j++,
            name: num.name,
            slug: num.slug,
            ecv: num.ecv,
            footprint: num.footprint
        };
    });
    let numeriques = await Promise.all(NumeriquePromises);
    await insererDonneesTable(numeriques,columnsTables,thematiques);

  } catch (error) {
    console.error('Erreur lors de la requête  :', error);
    throw new Error("erreur dans la route  " + error.message);
  }
}

/**
 * Fonction qui va remplir une table dans la base de données de GéoMobiles.
 * @param {Array} data tableau d'objet contenant des données pour remplir un tableau en BD
 * @param {Array} columns tableau avec les noms des colonnes des tables en BD
 * @param {String} table nom de la table en BD
 */
async function insererDonneesTable(data,columns,table) {
  if (Array.isArray(data)) {
    try {
      for (let i = 0; i < data.length; i++) {
        await pool.query(`INSERT INTO ${table}(${columns.join(', ')}) VALUES(${columns.map((_, i) => `$${i + 1}`).join(', ')})`,[data[i].id,data[i].name,data[i].slug,data[i].ecv,data[i].footprint]);
      }
      console.log('Données insérées avec succès. Table :'+table);
    } catch (error) {
      console.error('Erreur lors de l\'insertion des données : ' +table, error.message);
      console.error('Requête causant l\'erreur:', error.query);
      throw error;
    }
  }
  else {
    try {
      const query = {
        text: `INSERT INTO ${table}(${columns.join(', ')}) VALUES(${columns.map((_, i) => `$${i + 1}`).join(', ')})`,
        values: data,
      };
      await pool.query(query);
      console.log('Données insérées avec succès. Table :' +table);
    } catch (error) {
      console.error('Erreur lors de l\'insertion des données. Table :' +table, error.message);
      console.error('Requête causant l\'erreur:', error.query); // Si votre gestionnaire d'erreur inclut la requête
      throw error;
    }
  }
}

module.exports = {
  getTest,
  deleteData,
  insertAll,
  createTables
}
