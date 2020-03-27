const express = require('express');
process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const app = express();
var result;
app.get('/', (req, res) =>{
     run();
     console.log(result);
     res.send('ok');
}
);

async function run() {
    let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(dbConfig);
    sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };
    result = await connection.execute(sql, binds, options);
    console.log("Current date query results: ");
    console.log(result);
   return result;
  }  catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}




app.listen(3000);

