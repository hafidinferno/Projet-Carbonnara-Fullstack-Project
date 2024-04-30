// const { default: expect } = require('expect');
// const {getEaux, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqEaux = {
//   body: {
//     eauenbouteillepourcentage: 70,
//     eaudurobinetpourcentage: 30,
//   }
// }

// const resEaux = {
//   status: (code) => {
//     resEaux.statusCode = code;
//     return resEaux;
//   },
//   json: (data) => {
//     resEaux.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getEaux should return correct carbon footprint for given pourcent of water', async () => {
  
//   const result = await getEaux(reqEaux, resEaux);
  
//   expect(resEaux.statusCode).toEqual(200);
//   expect(resEaux.data).toEqual({ eaux: 17063.004847390002 });
// }, 1000);

const { default: expect } = require('expect');
const { getEaux, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqEaux = {
  body: {
    eauenbouteillepourcentage: 70,
    eaudurobinetpourcentage: 30,
  }
}

const resEaux = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getEaux should return correct carbon footprint for given pourcent of water', async () => {
  await getEaux(reqEaux, resEaux);

  expect(resEaux.status).toHaveBeenCalledWith(200);
  expect(resEaux.json).toHaveBeenCalledWith({ eaux: 17063.004847390002 });
}, 1000);
