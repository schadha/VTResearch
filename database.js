var mysql = require('mysql');
var connection = mysql.createConnection({
    user: 'root', 
    password: 'testing',
});

connection.connect();

connection.query('USE VTResearch');

function updateTimeInfo(busName, busCode, timing) {
    if (busName && busCode && timing) {
        connection.query('insert into BusTracker (BusName, BusCode, BusTime) values(?, ?, ?)', [busName, busCode, timing],
        function(err){
            if (err) {
                throw err;
            } else {
                console.log(busName + ' added to database!');
            }
        }); 
    }
}

function deleteTimeInfo(busName, busCode, busTime) {
    connection.query('delete from BusTracker where BusName=' + JSON.stringify(busName)
        + " and BusCode = " + JSON.stringify(busCode) + ' and BusTime = ' + JSON.stringify(busTime), function(err){
            if(err)
                {
                    console.log(err);
                } else {
                    console.log(busName + ' is deleted');
                }
        });
}

/*
 * I want to try to keep only 10 rows of timings for each busstop. 
 * After the 10th time, then it should delete the oldest time and 
 * replace it with the new insertion. 
 */
function monitorCount(busName, busCode)
{
    connection.query('select * from BusTracker where BusName = ' + JSON.stringify(busName) + ' and BusCode = ' + JSON.stringify(busCode),  function(err, rows) {
        if (err) {
            throw err;
        }
        else {
            if (rows.length == 10)
                {
                    deleteTimeInfo(busName, busCode, rows[0].BusTime); 
                }
        }
    });
}


function retrieveLatestBusInfo(busName, busCode)
{
    connection.query('select * from BusTracker where BusName= ' + JSON.stringify(busName) + ' and BusCode = ' + JSON.stringify(busCode), function (err, rows) {
        if (err) {
            throw err;
        }
        else {
            console.log(rows[rows.length - 1].BusTime);
            return rows[rows.length - 1].BusTime;
        }
    });
}

exports.updateTimeInfo = updateTimeInfo;
exports.monitorCount = monitorCount;
exports.retrieveLatestBusInfo = retrieveLatestBusInfo;
