const Pool = require('pg').Pool;
const cors = require("cors");
const credentials = require('../bd.js');
const fetch = require('node-fetch');
const { footprintBoisson, footprintBoissons } = require('./calcul.js');


const pool = new Pool(credentials)

pool.connect(function(err) {
  if(err) throw err;
  console.log("Database connected!");
});

//TEST
const getTest = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT emoji
      FROM habitude
    `)
    const emoji = result.rows.map(row => row.emoji);

    res.status(200).json({ emoji });
  } catch (error) {
    console.error('Erreur lors de la récupération des emoji de la table "habitude":', error);
    res.status(500).json({ error: error.message });
  }
}

const getCarbonne = async (req, res) => {
  try {
    const slug = req.params.slug;
    const name = req.params.name;

    const result = await pool.query(`
      SELECT ecv
      FROM consommation
      WHERE slug = $1 AND name = $2
    `, [slug, name]);

    const ecv = result.rows[0].ecv;

    res.status(200).json({ ecv });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ECV de la table "consommation":', error);
    res.status(500).json({ error: error.message });
  }
}

const getFootPrint = async (req, res) => {
  try {
    const slug = req.params.slug;

    const result = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = $1 
    `, [slug]);

    const footprint = result.rows[0].footprint;

    res.status(200).json({ footprint });
  } catch (error) {
    console.error('Erreur lors de la récupération du footprint de la table "consommation":', error);
    res.status(500).json({ error: error.message });
  }
}

const getEmoji = async (req, res) => {
  try {
    const slug = req.params.slug;

    const result = await pool.query(`
      SELECT emoji
      FROM habitude
      WHERE slug = $1
    `, [slug]);

    const emoji = result.rows[0].emoji;

    res.status(200).json({ emoji });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'emoji du theme:', error);
    res.status(500).json({ error: error.message });
  }
}

const getElectromenager = async (req, res) => {

  let appareils = {
    bouilloire: 1,
    cafetieredosette: 1,
    cafetierefiltre: 1,
    cafetiereexpresso: 1,
    fourelectrique: 1,
    lavevaisselle: 1,
    lavelinge: 1,
    refrigirateur: 1,
    aspirateur: 1,
    climatiseur: 1
  };


  try {

    const result = await pool.query(`
      SELECT *
      FROM habitude
      join consommation ON habitude.id = consommation.id_habitude
      WHERE habitude.slug = 'electromenager'
      `);

    const elecData = result.rows.map(row => ({
      slug: row.slug,
      ecv: row.ecv
    }));
    let sommeEcvAppareil = 0;

    for (const item of elecData) {
      if (appareils[item.slug]) {
        sommeEcvAppareil += item.ecv * appareils[item.slug];
        console.log(item.slug, item.ecv * appareils[item.slug]);
      }
    }
    res.status(200).json(sommeEcvAppareil);
  } catch (error) {
    console.error('Erreur lors de la récupération de electromenager', error);
    res.status(500).json({ error: error.message });
  }
}

const getRepas = async (req, res) => {

  const regimes = {
    repasavecduboeuf: 1,
    repasavecdupoulet: 1,
    repasavecdupoissonblanc: 1,
    repasavecdupoissongras: 1,
    repasvegetarien: 1,
    repasvegetalien: 1
  };


  try {

    const result = await pool.query(`
      SELECT *
      FROM habitude
      join consommation ON habitude.id = consommation.id_habitude
      WHERE habitude.slug = 'repas'
      `);

    const repasData = result.rows.map(row => ({
      slug: row.slug,
      ecv: row.ecv
    }));

    let sommeEcvregimes = 0;

    for (const item of repasData) {
      if (regimes[item.slug]) {
        sommeEcvregimes += item.ecv * regimes[item.slug];
        console.log(item.slug, item.ecv * regimes[item.slug]);
      }
    }
    res.status(200).json(sommeEcvregimes);
  } catch (error) {
    console.error('Erreur lors de la récupération de repas', error);
    res.status(500).json({ error: error.message });
  }
}
const getBoissonsEcv = async (req, res) => {
  try {
    // const qtesoda = req.body.soda;
    // const qtevin = req.body.vin;
    // const qtebiere = req.body.biere;
    // const qtelait = req.body.lait;
    // const qtelaitsoja = req.body.laitsoja;
    // const qtethe = req.body.the;
    // const qtecafe = req.body.cafe;
    let qtesoda = 2;
    let qtevin = 1;
    let qtebiere = 0;
    let qtelait = 12;
    let qtelaitsoja = 4;
    let qtethe = 0;
    let qtecafe = 0;

    const resultSoda = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'soda' AND thematiques = 'boisson'
    `);

    const resultVin = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'vin' AND thematiques = 'boisson'
    `);

    const resultBiere = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'biere' AND thematiques = 'boisson'
    `);

    const resultLait = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'laitdevache' AND thematiques = 'boisson'
    `);

    const resultLaitsoja = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'laitdesoja' AND thematiques = 'boisson'
    `);

    const resultThe = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'thé' AND thematiques = 'boisson'
    `);

    const resultCafe = await pool.query(`
      SELECT footprint
      FROM consommation
      WHERE slug = 'cafe' AND thematiques = 'boisson'
    `);

    const result = footprintBoissons(footprintBoisson(resultSoda.rows[0].footprint, qtesoda), footprintBoisson(resultVin.rows[0].footprint, qtevin), footprintBoisson(resultBiere.rows[0].footprint, qtebiere), footprintBoisson(resultLait.rows[0].footprint, qtelait), footprintBoisson(resultLaitsoja.rows[0].footprint, qtelaitsoja), footprintBoisson(resultThe.rows[0].footprint, qtethe), footprintBoisson(resultCafe.rows[0].footprint, qtecafe));
    console.log(result);
    await res.status(200).json({ result });

  } catch (error) {
    console.error('Erruer lors de la récupération de données de thématique "boisson" de la table "consommation":', error);
    res.status(500).json({ error: error.message });
  }
}

const deleteData = async (req, res) => {
  try {
    // Suppression de tout dans les tables
    await pool.query(`
    DELETE FROM "consommation";
    DELETE FROM "habitude";
  `);
    res.send("Tout a été supprimé dans les tables.");
  } catch (error) {
    console.error('Erreur lors de la suppressions des tables:', error);
    res.status(500).json({error: error.message});
  }
}

const createTables = async (req, res) => {
  try {
    //Création des tables
    await pool.query(`
      CREATE TABLE public.habitude(
        id      SERIAL NOT NULL ,
        name    VARCHAR (255) NOT NULL ,
        emoji   VARCHAR (10) NOT NULL ,
        slug    VARCHAR (255) NOT NULL  ,
        CONSTRAINT habitude_PK PRIMARY KEY (id)
      )WITHOUT OIDS;
      
      CREATE TABLE public.consommation(
        id            SERIAL NOT NULL ,
        name          VARCHAR (255) NOT NULL ,
        slug          VARCHAR (255) NOT NULL ,
        ecv           FLOAT NOT NULL ,
        footprint     FLOAT NOT NULL ,
        thematiques   VARCHAR (255) NOT NULL ,
        id_habitude   INT  NOT NULL  ,
        CONSTRAINT consommation_PK PRIMARY KEY (id)
    
        ,CONSTRAINT consommation_habitude_FK FOREIGN KEY (id_habitude) REFERENCES public.habitude(id)
    )WITHOUT OIDS;

  `);
  res.send("Tout a été fait");
  } catch (error) {
    console.error('Erreur création des tables', error);
    res.status(500).json({error: error.message});
  }
}

const insertAll = async (req, res) => {
  try {
    await habitude()
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
  'name', 'slug','ecv','footprint','thematiques','id_habitude'
];

const columnsTablesHabitude = [
  'id','name','emoji','slug'
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

async function habitude() {
  let url = `https://impactco2.fr/api/v1/thematiques`;

  let options = {
    method: 'GET',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : 'e5aeebef-d309-416f-a3d2-73db5522952a.'
  };

  try {
    let response = await fetch(url, options);

    const data = await response.json();

    let habitudePromises = data.data.map(num => {
      return {
        id:thematiques.indexOf(num.slug)+1,
        name: num.name,
        emoji: num.emoji,
        slug: num.slug,
      };
    });
    let habitudes = await Promise.all(habitudePromises);
    await insererDonneesTable(habitudes,columnsTablesHabitude,'habitude');

  } catch (error) {
    console.error('Erreur lors de la requête  :', error);
    throw new Error("erreur dans la route  " + error.message);
  }
}

async function tables(thematiques,ii) {
  let url = `https://impactco2.fr/api/v1/thematiques/ecv/${ii}?detail=1`;

  let options = {
    method: 'GET',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : 'e5aeebef-d309-416f-a3d2-73db5522952a.'
  };

  try {
    let response = await fetch(url, options);

    const data = await response.json();

    let NumeriquePromises = data.data.map(num => {
        return {
            name: num.name,
            slug: num.slug,
            ecv: num.ecv,
            footprint: num.footprint,
            thematiques: thematiques,
            id_habitude: ii,
        };
    });
    let numeriques = await Promise.all(NumeriquePromises);
    await insererDonneesTable(numeriques,columnsTables,'consommation');

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
        if (table==='consommation') {
          await pool.query(`INSERT INTO ${table}(${columns.join(', ')}) VALUES(${columns.map((_, i) => `$${i + 1}`).join(', ')})`, [data[i].name, data[i].slug, data[i].ecv, data[i].footprint, data[i].thematiques, data[i].id_habitude]);
        }
        else {
          await pool.query(`INSERT INTO ${table}(${columns.join(', ')}) VALUES(${columns.map((_, i) => `$${i + 1}`).join(', ')})`, [data[i].id, data[i].name, data[i].emoji, data[i].slug]);
        }
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
  getRepas,
  getElectromenager,
  getTest,
  getEmoji,
  getFootPrint,
  getCarbonne,
  deleteData,
  getBoissonsEcv,
  insertAll,
  createTables
}
