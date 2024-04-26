// footprint.test.js
const { footprint, footprintBoissons, moyenne, moyenneAnnee } = require('../../../src/backend/calcul.cjs');

test('calculates footprint for a single beverage correctly', () => {
  expect(footprint(10, 2)).toBe(20);
});

// Test for footprintBoissons function
test('calculates total footprint for multiple beverages correctly', () => {
  const ecvSoda = 5,
        ecvVin = 8,
        ecvBiere = 12,
        ecvLait = 3,
        ecvLaitSoja = 4,
        ecvThe = 2,
        ecvCafe = 6;

  // Expected total footprint: 5 + 8 + 12 + 3 + 4 + 2 + 6 = 40
  expect(footprintBoissons(ecvSoda, ecvVin, ecvBiere, ecvLait, ecvLaitSoja, ecvThe, ecvCafe)).toBe(40);
});

test('calculates average footprint for a total footprint and the quantity of element given', () => {
  const ecvEauEnBouteille = 2,
        ecvEauDuRobinet = 4;
  
  //Expected total average: (4 + 2)/2 = 3
  expect(moyenne(2+4, 2)).toBe(3);
})

test('calculates average footprint in a year for a total footprint and the quantity of element given', () => {
  const ecvSoda = 5,
        ecvVin = 8,
        ecvBiere = 12,
        ecvLait = 3,
        ecvLaitSoja = 4,
        ecvThe = 2,
        ecvCafe = 6;
  
  // Average of footprint for a week
  const average = moyenne(footprintBoissons(ecvSoda, ecvVin, ecvBiere, ecvLait, ecvLaitSoja, ecvThe, ecvCafe), 7)
  //Expected total average: (40/7)*12
  // expect(moyenneAnnee(average, 12)).toBe(68.57142857142857);
})

