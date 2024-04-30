const { default: expect } = require('expect');
const {getVetements } = require('../../../src/backend/queries.cjs');
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

const reqVetements = {
  body: {
    polo: 1,
    tshirtencoton: 1,
    tshirtenpolyester: 1,
    sweatencoton: 1,
    chemiseencoton: 0,
    chemiseenviscose: 0,
    chaussuresencuir: 0,
    chaussuresentissu: 0,
    chaussuresdesport: 1,
    robeencoton: 0,
    robeenpolyester: 0,
    robeenviscose: 0,
    pullenlaine: 1,
    pullenacrylique: 1,
    pullencotonrecycle: 0,
    manteau: 1,
    vesteimpermeable: 0,
    vestesimilicuir: 0,
    jeans: 1,
  }
};

const resVetements = {
  status: (code) => {
    resVetements.statusCode = code;
    return resVetements;
  },
  json: (data) => {
    resVetements.data = data;
  }
};

test('getVetements should return correct carbon footprint for given clothes', async () => {
  
  const result = await getVetements(reqVetements, resVetements);
  
  expect(resVetements.statusCode).toEqual(200);
  expect(resVetements.data).toEqual({ vetements: 287.600226919801 });
});