// const { default: expect } = require('expect');
// const {getNumeriqueEcv, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqNumeriques = {
//   body: {
//     smartphone: 1,
//     tabletteclassique: 0,
//     ordinateurfixeparticulier: 1,
//     ordinateurportable: 1,
//     ecran: 0,
//     enceintebluetooth: 1,
//     television: 0,
//     box: 0,
//   }
// }

// const resNumeriques = {
//   status: (code) => {
//     resNumeriques.statusCode = code;
//     return resNumeriques;
//   },
//   json: (data) => {
//     resNumeriques.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
//   const result = await getNumeriqueEcv(reqNumeriques, resNumeriques);
  
//   expect(resNumeriques.statusCode).toEqual(200);
//   expect(resNumeriques.data).toEqual({ numerique: 56.4 });
// }, 1000);

const { default: expect } = require('expect');
const { getNumeriqueEcv, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqNumeriques = {
  body: {
    smartphone: 1,
    tabletteclassique: 0,
    ordinateurfixeparticulier: 1,
    ordinateurportable: 1,
    ecran: 0,
    enceintebluetooth: 1,
    television: 0,
    box: 0,
  }
}

const resNumeriques = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getNumeriqueEcv should return correct carbon footprint for given digital devices', async () => {
  await getNumeriqueEcv(reqNumeriques, resNumeriques);

  expect(resNumeriques.status).toHaveBeenCalledWith(200);
  expect(resNumeriques.json).toHaveBeenCalledWith({ numerique: 56.4 });
}, 1000);
