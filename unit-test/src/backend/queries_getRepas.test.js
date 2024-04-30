// const { default: expect } = require('expect');
// const {getRepas, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
// const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// /**
//  * Connexion à la base de données
//  */
// beforeAll(async () => {
//   await connectDB();
// });

// //ferme la connexion
// afterAll(async () => {
//   await disconnectDB();
// });

// const reqRepas = {
//   body: {
//       repasavecduboeuf: 1,
//       repasavecdupoulet: 1,
//       repasavecdupoissonblanc: 0,
//       repasavecdupoissongras: 0,
//       repasvegetarien: 1,
//       repasvegetalien: 0,
//   }
// }

// const resRepas = {
//   status: (code) => {
//     resRepas.statusCode = code;
//     return resRepas;
//   },
//   json: (data) => {
//     resRepas.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getRepas should return correct carbon footprint for given dish', async () => {
  
//   const result = await getRepas(reqRepas, resRepas);
  
//   expect(resRepas.statusCode).toEqual(200);
//   expect(resRepas.data).toEqual({ repas: 81.03333333333333 });
// }, 1000);


// const reqRepasBad = {
//   body: {
//       repasboeuf: 1,
//       repaspoulet: 1,
//       repaspoissonblanc: 0,
//       repasgras: 0,
//       vegetarien: 1,
//       repasvegetalien: 0,
//   }
// }

// const resRepasBad = {
//   status: (code) => {
//     resRepasBad.statusCode = code;
//     return resRepasBad;
//   },
//   json: (data) => {
//     resRepasBad.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getRepas should return NaN carbon footprint for given bad dish', async () => {
  
//   const result = await getRepas(reqRepasBad, resRepasBad);
  
//   expect(resRepasBad.statusCode).toEqual(200);
//   expect(resRepasBad.data).toEqual({ repas: NaN });
// }, 1000);

const { default: expect } = require('expect');
const { getRepas, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
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
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getRepas should return correct carbon footprint for given dish', async () => {
  await getRepas(reqRepas, resRepas);

  expect(resRepas.status).toHaveBeenCalledWith(200);
  expect(resRepas.json).toHaveBeenCalledWith({ repas: 81.03333333333333 });
}, 1000);

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
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getRepas should return NaN carbon footprint for given bad dish', async () => {
  await getRepas(reqRepasBad, resRepasBad);

  expect(resRepasBad.status).toHaveBeenCalledWith(200);
  expect(resRepasBad.json).toHaveBeenCalledWith({ repas: NaN });
}, 1000);
