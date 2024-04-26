const { default: expect } = require('expect');
const {getTransport} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll } = require('jest-circus');
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
afterAll(() => {
  pool.end();
});

const reqTransport = {
  body: {
    avioncourtcourrier: req.body.avioncourtcourrier,
    avionmoyencourrier: req.body.avionmoyencourrier,
    avionlongcourrier: req.body.avionlongcourrier,
    tgv: req.body.tgv,
    intercites: req.body.intercites,
    voiturethermique: req.body.voiturethermique,
    voitureelectrique: req.body.voitureelectrique,
    autocar: req.body.autocar,
    velo: req.body.velo,
    veloelectrique: req.body.veloelectrique,
    busthermique: req.body.busthermique,
    tramway: req.body.tramway,
    metro: req.body.metro,
    scooter: req.body.scooter,
    moto: req.body.moto,
    rer: req.body.rer,
    ter: req.body.ter,
    buselectrique: req.body.buselectrique,
    busgnv: req.body.busgnv,
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
  expect(resTransport.data).toEqual({ transport: 81.03333333333333 });
});