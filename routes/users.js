var express = require('express');
const mysql = require('mysql');
var router = express.Router();


var config =
    {
      host: "sep6db.mysql.database.azure.com",
      user: "sep6@sep6db",
      password: process.env.YourAppSetting,
      database: 'united_airplanes_db',
      ssl: true
    };

const conn = new mysql.createConnection(process.env["MS_TableConnectionString"]);

conn.connect(
    function (err) {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
      }
      else {
        console.log("Connection established.");
      }
    });

/* GET users listing. */
router.get('/', function(req, res, next) {

    let q = "select * from airlines";
    conn.query(q, function (error, results) {
      if (error) throw error;
      res.setHeader('content-type', 'application/json');
      res.send(results);
    });
});

/*
* const mysql = require('mysql');

var config =
{
    host: "sep6db.mysql.database.azure.com",
    user: "sep6@sep6db",
    password: "Sepsix1234",
    database: 'united_airplanes_db',
    ssl: true
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
        }
    });

module.exports = function (context, req) {

    conn.query('select * from airlines',
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            context.log('comments', results);
            context.res = {
                headers: { 'Content-Type': 'application/json' },
                body: results
            };
            context.done();
        })
    conn.end(
        function (err) {
            if (err) throw err;
            else console.log('Closing connection.')
        });

};
*/



module.exports = router;
