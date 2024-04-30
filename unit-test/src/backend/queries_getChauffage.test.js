const { default: expect } = require('expect');
const {getChauffage} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(() => {
  pool.connect(function(err) {
    if(err) throw err;
  });
})

//ferme la connexion
afterEach(() => {
  pool.end();
});

const reqChauffage = {
  body: {
    chauffagegaz: 0,
    chauffagefioul: 1,
    chauffageelectrique: 1,
    pompeachaleur: 0,
    poeleagranule: 1,
    poeleabois: 0,
    reseaudechaleur: 0,
  }
}

const resChauffage = {
  status: (code) => {
    resChauffage.statusCode = code;
    return resChauffage;
  },
  json: (data) => {
    resChauffage.data = data;
  }
};

test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
  const result = await getChauffage(reqChauffage, resChauffage);
  
  expect(resChauffage.statusCode).toEqual(200);
  expect(resChauffage.data).toEqual({ chauffage: 74.66 });
});