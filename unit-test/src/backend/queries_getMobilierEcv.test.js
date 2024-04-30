const { default: expect } = require('expect');
const {getMobilierEcv} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll } = require('jest-circus');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(async () => {
  pool.connect(function(err) {
    if(err) throw err;
  });
})

//ferme la connexion
afterAll(async () => {
  await pool.end();
});

const reqMobilier = {
  body: {
    canapeconvertible: 0,
    chaiseenbois: 2,
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

const reqMobilierBad = {
    body: {
      canape: 0,
      chaise: 2,
      table: 2,
      armoire: 4,
      lit: 4,
    }
  };
  
  const resMobilierBad = {
    status: (code) => {
      resMobilierBad.statusCode = code;
      return resMobilierBad;
    },
    json: (data) => {
      resMobilierBad.data = data;
    }
  };
  
  test('getMobilierEcv should return NaN carbon footprint for given bad piece of furniture', async () => {
    
    const result = await getMobilierEcv(reqMobilierBad, resMobilierBad);
    
    expect(resMobilierBad.statusCode).toEqual(200);
    expect(resMobilierBad.data).toEqual({ mobilier: NaN });
  });