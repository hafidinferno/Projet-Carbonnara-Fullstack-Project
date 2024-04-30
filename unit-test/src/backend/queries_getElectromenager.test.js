// const { default: expect } = require('expect');
// const {getElectromenager, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqElectromenagers = {
//   body: {
//     bouilloire: 1,
//     cafetieredosette: 0,
//     cafetierefiltre: 0,
//     cafetiereexpresso: 0,
//     fourelectrique: 1,
//     lavevaisselle: 0,
//     lavelinge: 1,
//     refrigerateur: 1,
//     aspirateur: 1,
//     climatiseur: 0,
//   }
// }

// const resElectromenagers = {
//   status: (code) => {
//     resElectromenagers.statusCode = code;
//     return resElectromenagers;
//   },
//   json: (data) => {
//     resElectromenagers.data = data;
//     return Promise.resolve(); 
//   }
// };

// test('getElectromenager should return correct carbon footprint for given clean machine', async () => {
  
//   const result = await getElectromenager(reqElectromenagers, resElectromenagers);
  
//   expect(resElectromenagers.statusCode).toEqual(200);
//   expect(resElectromenagers.data).toEqual({ electromenager: 1186.976710783254 });
// }, 1000);


const { default: expect } = require('expect');
const {getElectromenager, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

/**
 * Connexion à la base de données
 */
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqElectromenagers = {
  body: {
    bouilloire: 1,
    cafetieredosette: 0,
    cafetierefiltre: 0,
    cafetiereexpresso: 0,
    fourelectrique: 1,
    lavevaisselle: 0,
    lavelinge: 1,
    refrigerateur: 1,
    aspirateur: 1,
    climatiseur: 0,
  }
}

const resElectromenagers = {
  status: (code) => {
    resElectromenagers.statusCode = code;
    return resElectromenagers;
  },
  json: (data) => {
    resElectromenagers.data = data;
    return Promise.resolve(); 
  }
};

test('getElectromenager should return correct carbon footprint for given clean machine', async () => {
  
  const result = await getElectromenager(reqElectromenagers, resElectromenagers);
  
  expect(resElectromenagers.statusCode).toEqual(200);
  expect(resElectromenagers.data).toEqual({ electromenager: 1186.976710783254 });
}, 1000);