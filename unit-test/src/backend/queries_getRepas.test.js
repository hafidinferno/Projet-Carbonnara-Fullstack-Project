const { default: expect } = require('expect');
const {getRepas} = require('../../../src/backend/queries.cjs');
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

const reqRepas = {
  body: {
    repasavecduboeuf: 1,
    repasavecdupoulet: 1,
    repasavecdupoissonblanc: 0,
    repasavecdupoissongras: 0,
    repasvegetarien: 1,
    repasvegetalien: 0,
  }
}

const resRepas = {
  status: (code) => {
    resRepas.statusCode = code;
    return resRepas;
  },
  json: (data) => {
    resRepas.data = data;
  }
};

test('getRepas should return correct carbon footprint for given dish', async () => {
  
  const result = await getRepas(reqRepas, resRepas);
  
  expect(resRepas.statusCode).toEqual(200);
  expect(resRepas.data).toEqual({ repas: 81.03333333333333 });
});