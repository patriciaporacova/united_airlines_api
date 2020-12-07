let express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select * from planes";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

module.exports = router;