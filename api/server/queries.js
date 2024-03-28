const Pool = require('pg').Pool

const pool = new Pool({
  user: 'p2310067',
  host: '192.168.75.17',
  database: 'mif10',
  port: 5432,
})

const getTest = (req, res) => {
    pool.query('SELECT * FROM test', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

module.exports = {
    getTest,
}