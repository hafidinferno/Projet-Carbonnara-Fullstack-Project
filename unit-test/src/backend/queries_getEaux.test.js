const { default: expect } = require('expect');
const {getEaux} = require('../../../src/backend/queries.cjs');
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
afterAll(async () => {
  await pool.end();
});

const reqEaux = {
  body: {
    eauenbouteillepourcentage: 70,
    eaudurobinetpourcentage: 30,
  }
}

const resEaux = {
  status: (code) => {
    resEaux.statusCode = code;
    return resEaux;
  },
  json: (data) => {
    resEaux.data = data;
  }
};

test('getEaux should return correct carbon footprint for given pourcent of water', async () => {
  
  const result = await getEaux(reqEaux, resEaux);
  
  expect(resEaux.statusCode).toEqual(200);
  expect(resEaux.data).toEqual({ eaux: 17063.004847390002 });
});