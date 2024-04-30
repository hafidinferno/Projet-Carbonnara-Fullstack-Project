const { default: expect } = require('expect');
const {getNumeriqueEcv} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(() => {
  pool.connect(function(err) {
    if(err) throw err;
    console.log("Database connected!");
  });
})

//ferme la connexion
afterEach(() => {
  pool.end();
  console.log("Database deconnected!");
});

const reqNumeriques = {
  body: {
    smartphone: 1,
    tabletteclassique: 0,
    ordinateurfixeparticulier: 1,
    ordinateurportable: 1,
    ecran: 0,
    enceintebluetooth: 1,
    television: 0,
    box: 0,
  }
}

const resNumeriques = {
  status: (code) => {
    resNumeriques.statusCode = code;
    return resNumeriques;
  },
  json: (data) => {
    resNumeriques.data = data;
  }
};

test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
  const result = await getNumeriqueEcv(reqNumeriques, resNumeriques);
  
  expect(resNumeriques.statusCode).toEqual(200);
  expect(resNumeriques.data).toEqual({ numerique: 56.4 });
});