// const { default: expect } = require('expect');
// const {getBoissonsEcv, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqBoissons = {
//   body: {
//     soda: 0,
//     vin: 1,
//     biere: 2,
//     lait: 0,
//     laitsoja: 4,
//     the: 3,
//     cafe: 1,
//   }
// }

// const resBoissons = {
//   status: (code) => {
//     resBoissons.statusCode = code;
//     return resBoissons;
//   },
//   json: (data) => {
//     resBoissons.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getBoissonsEcv should return correct carbon footprint for given types of drinks', async () => {
//   const result = await getBoissonsEcv(reqBoissons, resBoissons);
  
//   expect(resBoissons.statusCode).toEqual(200);
//   expect(resBoissons.data).toEqual({ boissons: 28.001518822538188 });
// }, 1000);


const { default: expect } = require('expect');
const { getBoissonsEcv, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
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
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getBoissonsEcv should return correct carbon footprint for given types of drinks', async () => {
  await getBoissonsEcv(reqBoissons, resBoissons);

  expect(resBoissons.status).toHaveBeenCalledWith(200);
  expect(resBoissons.json).toHaveBeenCalledWith({ boissons: 28.001518822538188 });
}, 1000);
