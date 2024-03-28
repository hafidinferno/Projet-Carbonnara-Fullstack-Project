const Pool = require('pg').Pool
const fs = require('fs')

const pool = new Pool({
  user: 'p2310067',
  host: '192.168.75.17',
  database: 'mif10',
  password: 'tmppswd',
  port: 5432,
  ssl: {
    ca : fs.readFileSync('./m1if10-2023-2024-gr10-m1if-ca.cert.txt')
  }
})

//TODO : A SUPPRIMER QUAND LA CONNEXION SERA ETABLIE
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'azerty',
//   port: 5432,
// })

pool.connect(function(err) {
  if(err) throw err;
  console.log("Database connected!");
});


const getTest = (req, res) => {
    pool.query('SELECT * FROM test', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

//TODO : GET carbone du thématique séléctionné
const getCarbonne = (req, res) => {

}



module.exports = {
    getTest,
}