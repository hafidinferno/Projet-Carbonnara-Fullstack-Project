// jest.mock('pg'); // Mock the pg module

// // Mock the Pool constructor
// const PoolMock = require('pg').Pool;
// const pool = new PoolMock();

// // Mock the query method
// pool.query = jest.fn();

// // Your test
// test('getFruitsetLegumesEcv should return correct carbon footprint for given types of fruits and legumes', async () => {
//   // Mock the database response
//   pool.query.mockResolvedValueOnce({ rows: [{ fruitsetlegumes: 123 }] });

//   const result = await getFruitsetLegumesEcv(reqFruitsLegumes, resFruitsLegumes);

//   // Assert that the status code is correct
//   expect(resFruitsLegumes.statusCode).toEqual(200);

//   // Assert that the data is correct
//   expect(resFruitsLegumes.data).toEqual({ fruitsetlegumes: 123 });
// });
