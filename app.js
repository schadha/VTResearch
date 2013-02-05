var express = require('express');
var db = require('./database');
var app = express();
app.use(express.bodyParser());

app.post('/', function(req, res) {
    console.log('Res Received');
    res.send(db.retrieveLatestBusInfo(req.body.busName, req.body.busCode));
    console.log(db.retrieveLatestBusInfo(req.body.busName, req.body.busCode));
    res.end();
});

app.post('/post', function(req, res) {
    console.log('information received');
    res.send('blahh');
    db.monitorCount(req.body.busName, req.body.busCode, req.body.timing);
    db.updateTimeInfo(req.body.busName, req.body.busCode, req.body.timing);
    console.log(req.body);
    res.end();
});

app.listen(3000);



