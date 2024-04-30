// const { default: expect } = require('expect');
// const {getVetements, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
// const { beforeEach, beforeAll } = require('jest-circus');

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

// const reqVetements = {
//   body: {
//     polo: 1,
//     tshirtencoton: 1,
//     tshirtenpolyester: 1,
//     sweatencoton: 1,
//     chemiseencoton: 0,
//     chemiseenviscose: 0,
//     chaussuresencuir: 0,
//     chaussuresentissu: 0,
//     chaussuresdesport: 1,
//     robeencoton: 0,
//     robeenpolyester: 0,
//     robeenviscose: 0,
//     pullenlaine: 1,
//     pullenacrylique: 1,
//     pullencotonrecycle: 0,
//     manteau: 1,
//     vesteimpermeable: 0,
//     vestesimilicuir: 0,
//     jeans: 1,
//   }
// };

// const resVetements = {
//   status: (code) => {
//     resVetements.statusCode = code;
//     return resVetements;
//   },
//   json: (data) => {
//     resVetements.data = data;
//     return Promise.resolve();
//   }
// };

// test('getVetements should return correct carbon footprint for given clothes', async () => {
  
//   const result = await getVetements(reqVetements, resVetements);
  
//   expect(resVetements.statusCode).toEqual(200);
//   expect(resVetements.data).toEqual({ vetements: 287.600226919801 });
// }, 1000);

const { default: expect } = require('expect');
const { getVetements, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqVetements = {
  body: {
    polo: 1,
    tshirtencoton: 1,
    tshirtenpolyester: 1,
    sweatencoton: 1,
    chemiseencoton: 0,
    chemiseenviscose: 0,
    chaussuresencuir: 0,
    chaussuresentissu: 0,
    chaussuresdesport: 1,
    robeencoton: 0,
    robeenpolyester: 0,
    robeenviscose: 0,
    pullenlaine: 1,
    pullenacrylique: 1,
    pullencotonrecycle: 0,
    manteau: 1,
    vesteimpermeable: 0,
    vestesimilicuir: 0,
    jeans: 1,
  }
};

const resVetements = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getVetements should return correct carbon footprint for given clothes', async () => {
  await getVetements(reqVetements, resVetements);

  expect(resVetements.status).toHaveBeenCalledWith(200);
  expect(resVetements.json).toHaveBeenCalledWith({ vetements: 287.600226919801 });
}, 1000);
