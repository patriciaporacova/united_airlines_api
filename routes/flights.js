let express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT month, count(*) as 'number_of_flights' from `flights` group by month having COUNT(*)>=1 order by month";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/origin', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT month, origin,  count(*) as 'number_of_flights' from flights where origin = 'JFK' or origin ='EWR' or origin='LGA' group by origin,month order by month";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/origin/airtime', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin,  sum(air_time) as 'airtime' from flights where origin = 'JFK' or origin ='EWR' or origin='LGA' group by origin order by 'airtime' desc";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/top-10-destinations', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT  f.dest, f.origin, count(*) as 'number_of_flights'\n" +
            "FROM flights as f\n" +
            "INNER JOIN (\n" +
            "    select dest, count(*) 'no of flight'\n" +
            "    from flights\n" +
            "    group by dest\n" +
            "    having count(*)>1\n" +
            "    order by count(*) desc limit 10\n" +
            ") as `top10` on f.dest = top10.dest\n" +
            "group by f.dest,f.origin\n" +
            "order by f.dest, `no of flight`;";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

module.exports = router;
