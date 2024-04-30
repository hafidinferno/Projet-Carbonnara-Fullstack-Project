const { default: expect } = require('expect');
const {getMobilierEcv} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll } = require('jest-circus');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(() => {
  pool.connect(function(err) {
    if(err) throw err;
  });
})

//ferme la connexion
afterAll(() => {
  pool.end();
});

const reqMobilier = {
  body: {
    canapeconvertible: 0,
    chaiseenvois: 2,
    tableenbois: 2,
    canapetextile: 3,
    armoire: 4,
    lit: 4,
  }
};

const resMobilier = {
  status: (code) => {
    resMobilier.statusCode = code;
    return resMobilier;
  },
  json: (data) => {
    resMobilier.data = data;
  }
};

test('getMobilierEcv should return correct carbon footprint for given piece of furniture', async () => {
  
  const result = await getMobilierEcv(reqMobilier, resMobilier);
  
  expect(resMobilier.statusCode).toEqual(200);
  expect(resMobilier.data).toEqual({ mobilier: 6137.76 });
});