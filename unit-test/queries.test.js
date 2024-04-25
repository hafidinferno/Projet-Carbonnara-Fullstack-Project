require('C:/Users/olivi/Desktop/mif10/src/backend/queries.cjs');
// const { footprint, footprintBoissons, moyenne, moyenneAnnee} = require('./calcul.cjs');
const Pool = require('pg').Pool;

test('getVetements should return correct carbon footprint for given clothes', async () => {
    const clothes = {
      polo: 1,
      tshirtencoton: 1,
      tshirtenpolyester: 1,
    };
  
    const result = await getVetements(clothes);
  
    expect(result).toEqual({ vetements: expectedCarbonFootprint });
    pool.deconnect()
  });