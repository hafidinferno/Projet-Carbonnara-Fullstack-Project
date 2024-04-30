const { default: expect } = require('expect');
const {getBoissonsEcv} = require('../../../src/backend/queries.cjs');
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

const reqBoissons = {
  body: {
    soda: 0,
    vin: 1,
    biere: 2,
    lait: 0,
    laitsoja: 4,
    the: 3,
    cafe: 1,
  }
}

const resBoissons = {
  status: (code) => {
    resBoissons.statusCode = code;
    return resBoissons;
  },
  json: (data) => {
    resBoissons.data = data;
  }
};

test('getBoissonsEcv should return correct carbon footprint for given types of drinks', async () => {
  
  const result = await getBoissonsEcv(reqBoissons, resBoissons);
  
  expect(resBoissons.statusCode).toEqual(200);
  expect(resBoissons.data).toEqual({ boissons: 28.001518822538188 });
});