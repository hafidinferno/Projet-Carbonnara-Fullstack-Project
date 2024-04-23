// footprint.test.js
const { footprintBoisson, footprintBoissons } = require('../../../api/server/calcul');

// Test for footprintBoisson function
test('calculates footprint for a single beverage correctly', () => {
  expect(footprintBoisson(10, 2)).toBe(20); // Assuming footprint of 10 and quantity of 2
});

// Test for footprintBoissons function
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
