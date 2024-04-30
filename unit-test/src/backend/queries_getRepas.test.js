const { default: expect } = require('expect');
const {getRepas} = require('../../../src/backend/queries.cjs');
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


const reqRepasBad = {
  body: {
      repasboeuf: 1,
      repaspoulet: 1,
      repaspoissonblanc: 0,
      repasgras: 0,
      vegetarien: 1,
      repasvegetalien: 0,
  }
}

const resRepasBad = {
  status: (code) => {
    resRepasBad.statusCode = code;
    return resRepasBad;
  },
  json: (data) => {
    resRepasBad.data = data;
  }
};

test('getRepas should return NaN carbon footprint for given bad dish', async () => {
  
  const result = await getRepas(reqRepasBad, resRepasBad);
  
  expect(resRepasBad.statusCode).toEqual(200);
  expect(resRepasBad.data).toEqual({ repas: NaN });
});