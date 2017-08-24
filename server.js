// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var fs = require('fs');
var https = require('https');

var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.load();

if (process.env.debug) {
    console.log('irsend is in debug mode, the commands wont be sent to irsend. They will only be logged in console. To exit debug mode, change "debug" option in .env file');
}
var requireDir = require('require-dir');
var commandsControllers = requireDir('./commands');


//register commands
var commands = {};
for (commandCtrl in commandsControllers) {
    cmd = commandsControllers[commandCtrl];

    if (commands[cmd.cmdName]) throw 'duplicated command: ' + cmd.cmdName;

    commands[cmd.cmdName] = cmd.execute;
}

//console.log(commands);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port = process.env.PORT || 9599;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.route('/hook')
    .post(function(req, res) {
        console.log('hook request');

            var speech = 'empty';
            if (req.body) {
                if (req.body.result) {
                    speech = '';

                    if (req.body.result.fulfillment) {
                        speech += req.body.result.fulfillment.speech;
                        speech += ' ';
                    }

                    if (req.body.result.action) {
                        speech += 'action: ' + req.body.result.action;
                    }
                }
            }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            data: [],
            contextOut: [],
            source: 'yahooweather'
        });
    });

router.route('/remote')
    .post(function (req, res) {
        var action = req.body;
        console.log(action);
        //console.log('command: ' + action.command);
        if (commands[action.command]) {
            commands[action.command](action.data)
                .then((result) => { res.json({ message: 'OK!' }); })
                .catch((err) => { console.log(err); res.json({ message: 'FAIL!' }); });
        }
        else {
            res.json({ message: 'No Command' });
        }

    })
    .get(function(req,res){
        console.log(req);
        res.json({ message: 'No get plese' });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

// START THE SERVER
// =============================================================================

https.createServer({
      key: fs.readFileSync('newkey.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(port);

//app.listen(port);
console.log('Magic happens on port ' + port);
