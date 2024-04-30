// const { default: expect } = require('expect');
// const {getTransport, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqTransport = {
//   body: {
//     avioncourtcourrier: 0,
//     avionmoyencourrier: 0,
//     avionlongcourrier: 0,
//     tgv: 1,
//     intercites: 0,
//     voiturethermique: 1,
//     voitureelectrique: 0,
//     autocar: 0,
//     velo: 1,
//     veloelectrique: 1,
//     busthermique: 1,
//     tramway: 1,
//     metro: 1,
//     scooter: 0,
//     moto: 0,
//     rer: 1,
//     ter: 1,
//     buselectrique: 1,
//     busgnv: 0,
//   }
// }

// const resTransport = {
//   status: (code) => {
//     resTransport.statusCode = code;
//     return resTransport;
//   },
//   json: (data) => {
//     resTransport.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getTransport should return correct carbon footprint for given means of transport', async () => {
  
//   const result = await getTransport(reqTransport, resTransport);
  
//   expect(resTransport.statusCode).toEqual(200);
//   expect(resTransport.data).toEqual({ transport: 1.129138947368421 });
// }, 1000);

const { default: expect } = require('expect');
const { getTransport, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
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
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getTransport should return correct carbon footprint for given means of transport', async () => {
  await getTransport(reqTransport, resTransport);

  expect(resTransport.status).toHaveBeenCalledWith(200);
  expect(resTransport.json).toHaveBeenCalledWith({ transport: 1.129138947368421 });
}, 1000);
