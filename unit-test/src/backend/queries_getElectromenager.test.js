const { default: expect } = require('expect');
const {getElectromenager} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(async () => {
  pool.connect(function(err) {
    if(err) throw err;
  });
})

//ferme la connexion
afterEach(async () => {
  await pool.end();
});

const reqElectromenagers = {
  body: {
    bouilloire: 1,
    cafetieredosette: 0,
    cafetierefiltre: 0,
    cafetiereexpresso: 0,
    fourelectrique: 1,
    lavevaisselle: 0,
    lavelinge: 1,
    refrigerateur: 1,
    aspirateur: 1,
    climatiseur: 0,
  }
}

const resElectromenagers = {
  status: (code) => {
    resElectromenagers.statusCode = code;
    return resElectromenagers;
  },
  json: (data) => {
    resElectromenagers.data = data;
  }
};

test('getElectromenager should return correct carbon footprint for given clean machine', async () => {
  
  const result = await getElectromenager(reqElectromenagers, resElectromenagers);
  
  expect(resElectromenagers.statusCode).toEqual(200);
  expect(resElectromenagers.data).toEqual({ electromenager: 1186.976710783254 });
});