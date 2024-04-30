const { default: expect } = require('expect');
const {getUsageNumeriqueEcv} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');
const { spawn } = require('cross-spawn');
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
  status: (code) => {
    resUsage.statusCode = code;
    return resUsage;
  },
  json: (data) => {
    resUsage.data = data;
  }
};

test('getChauffage should return correct carbon footprint for given types of warming', async () => {
  
  const result = await getUsageNumeriqueEcv(reqUsage, resUsage);
  
  expect(resUsage.statusCode).toEqual(200);
  expect(resUsage.data).toEqual({ usagenumerique: 148.22002472886288 });
});