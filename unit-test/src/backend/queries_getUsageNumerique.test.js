// const { default: expect } = require('expect');
// const {getUsageNumeriqueEcv, connectDB, disconnectDB} = require('../../../src/backend/queries.cjs');
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

// const reqUsage = {
//   body: {
//     emailrecu: 14,
//     emailenvoye: 4,
//     spamrecu: 2,
//     spamenvoye: 0,
//     stockagedonnee: 250,
//     rechercheweb: 50,
//     streamingvideofait: 0,
//     streamingvideoregarde: 1,
//     visioconference: 2,
//     telechargement: 1,
//   }
// }

// const resUsage = {
//   status: (code) => {
//     resUsage.statusCode = code;
//     return resUsage;
//   },
//   json: (data) => {
//     resUsage.data = data;
//   }
// };

// test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
//   const result = await getUsageNumeriqueEcv(reqUsage, resUsage);
  
//   expect(resUsage.statusCode).toEqual(200);
//   expect(resUsage.data).toEqual({ usagenumerique: 148.22002472886288 });
// }, 1000);


// const reqUsageBad = {
//     body: {
//       email: 14,
//       spam: 2,
//       stockagedonnee: 250,
//       rechercheweb: 50,
//       streamingvideofait: 0,
//       streamingvideoregarde: 1,
//       visioconference: 2,
//       telechargement: 1,
//     }
//   }
  
//   const resUsageBad = {
//     status: (code) => {
//       resUsageBad.statusCode = code;
//       return resUsageBad;
//     },
//     json: (data) => {
//       resUsageBad.data = data;
//       return Promise.resolve(); 
//     }
//   };
  
//   test('getChauffage should return NaN carbon footprint for given bad types of warming', async () => {
    
//     const result = await getUsageNumeriqueEcv(reqUsageBad, resUsageBad);
    
//     expect(resUsageBad.statusCode).toEqual(200);
//     expect(resUsageBad.data).toEqual({ usagenumerique: NaN });
//   }, 1000);

const { default: expect } = require('expect');
const { getUsageNumeriqueEcv, connectDB, disconnectDB } = require('../../../src/backend/queries.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');

// Connexion à la base de données
beforeAll(async () => {
  await connectDB();
});

//ferme la connexion
afterAll(async () => {
  await disconnectDB();
});

const reqUsage = {
  body: {
    emailrecu: 14,
    emailenvoye: 4,
    spamrecu: 2,
    spamenvoye: 0,
    stockagedonnee: 250,
    rechercheweb: 50,
    streamingvideofait: 0,
    streamingvideoregarde: 1,
    visioconference: 2,
    telechargement: 1,
  }
}

const resUsage = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getUsageNumeriqueEcv should return correct carbon footprint for given usage', async () => {
  await getUsageNumeriqueEcv(reqUsage, resUsage);

  expect(resUsage.status).toHaveBeenCalledWith(200);
  expect(resUsage.json).toHaveBeenCalledWith({ usagenumerique: 148.22002472886288 });
}, 1000);

const reqUsageBad = {
  body: {
    email: 14,
    spam: 2,
    stockagedonnee: 250,
    rechercheweb: 50,
    streamingvideofait: 0,
    streamingvideoregarde: 1,
    visioconference: 2,
    telechargement: 1,
  }
}

const resUsageBad = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

test('getUsageNumeriqueEcv should return NaN carbon footprint for given bad usage', async () => {
  await getUsageNumeriqueEcv(reqUsageBad, resUsageBad);

  expect(resUsageBad.status).toHaveBeenCalledWith(200);
  expect(resUsageBad.json).toHaveBeenCalledWith({ usagenumerique: NaN });
}, 1000);
