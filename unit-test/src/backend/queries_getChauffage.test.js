// const { default: expect } = require('expect');
// const {getChauffage, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqChauffage = {
//   body: {
//     chauffagegaz: 0,
//     chauffagefioul: 1,
//     chauffageelectrique: 1,
//     pompeachaleur: 0,
//     poeleagranule: 1,
//     poeleabois: 0,
//     reseaudechaleur: 0,
//     surfaceHabitation: 15,
//   }
// }

// const resChauffage = {
//   status: (code) => {
//     resChauffage.statusCode = code;
//     return resChauffage;
//   },
//   json: (data) => {
//     resChauffage.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
//   const result = await getChauffage(reqChauffage, resChauffage);
  
//   expect(resChauffage.statusCode).toEqual(200);
//   expect(resChauffage.data).toEqual({ chauffage: 2182.2000000000003 });
// }, 1000);


const { default: expect } = require('expect');
const { getChauffage, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqChauffage = {
  body: {
    chauffagegaz: 0,
    chauffagefioul: 1,
    chauffageelectrique: 1,
    pompeachaleur: 0,
    poeleagranule: 1,
    poeleabois: 0,
    reseaudechaleur: 0,
    surfaceHabitation: 15,
  }
}

const resChauffage = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  await getChauffage(reqChauffage, resChauffage);

  expect(resChauffage.status).toHaveBeenCalledWith(200);
  expect(resChauffage.json).toHaveBeenCalledWith({ chauffage: 2182.2000000000003 });
}, 1000);
