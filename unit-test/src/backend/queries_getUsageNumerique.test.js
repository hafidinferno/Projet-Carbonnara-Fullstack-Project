const { default: expect } = require('expect');
const {getUsageNumeriqueEcv} = require('../../../src/backend/queries.cjs');
const credentials = require('../../../src/bd.cjs');
const { beforeEach, beforeAll, afterEach } = require('jest-circus');
const { spawn } = require('cross-spawn');
const Pool = require('pg').Pool;

const pool = new Pool(credentials)
//Connexion à la base de données
beforeAll(async () => {
  pool.connect(function(err) {
    if(err) throw err;
  });
})

//ferme la connexion
afterAll(async () => {
  await pool.end();
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
    status: (code) => {
      resUsageBad.statusCode = code;
      return resUsageBad;
    },
    json: (data) => {
      resUsageBad.data = data;
    }
  };
  
  test('getChauffage should return NaN carbon footprint for given bad types of warming', async () => {
    
    const result = await getUsageNumeriqueEcv(reqUsageBad, resUsageBad);
    
    expect(resUsageBad.statusCode).toEqual(200);
    expect(resUsageBad.data).toEqual({ usagenumerique: NaN });
  });