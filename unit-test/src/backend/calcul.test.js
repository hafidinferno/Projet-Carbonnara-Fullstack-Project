const { footprint, footprintBoissons, moyenne, moyenneAnnee } = require('../../../src/backend/calcul.cjs');

/**
 * Test for footprint function with drink's ecv data
 */
test('calculates footprint for a single beverage correctly', () => {
  expect(footprint(10, 2)).toBe(20); // Assuming footprint of 10 and quantity of 2
});

/**
 * Test for footprintBoissons function
 */
test('calculates total footprint for multiple beverages correctly', () => {
  // Assuming the following environmental footprint values for different beverages
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

/**
 * Test for moyenne function with water's ecv data
 */
test('calculates average footprint for a total footprint and the quantity of element given', () => {
  
  //Expected total average: (4 + 2)/2 = 3
  expect(moyenne(2+4, 2)).toBe(3);
})

/**
 * Test for moyenneAnnee function with average and number of weeks
 */
test('calculates average footprint in a year for a weekly average and the number of weeks', () => {
  const average = 10; // Weekly average
  const weeks = 52;   // Number of weeks in a year
  
  // Expected total average for a year: 10 * 52 = 520
  expect(moyenneAnnee(average, weeks)).toBe(520);
});
