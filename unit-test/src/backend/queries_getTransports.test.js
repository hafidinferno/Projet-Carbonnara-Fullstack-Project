const { default: expect } = require('expect');
const {getTransport} = require('../../../src/backend/queries.cjs');
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

const reqTransport = {
  body: {
    avioncourtcourrier: 0,
    avionmoyencourrier: 0,
    avionlongcourrier: 0,
    tgv: 1,
    intercites: 0,
    voiturethermique: 1,
    voitureelectrique: 0,
    autocar: 0,
    velo: 1,
    veloelectrique: 1,
    busthermique: 1,
    tramway: 1,
    metro: 1,
    scooter: 0,
    moto: 0,
    rer: 1,
    ter: 1,
    buselectrique: 1,
    busgnv: 0,
  }
}

const resTransport = {
  status: (code) => {
    resTransport.statusCode = code;
    return resTransport;
  },
  json: (data) => {
    resTransport.data = data;
  }
};

test('getTransport should return correct carbon footprint for given means of transport', async () => {
  
  const result = await getTransport(reqTransport, resTransport);
  
  expect(resTransport.statusCode).toEqual(200);
  expect(resTransport.data).toEqual({ transport: 1.129138947368421 });
});