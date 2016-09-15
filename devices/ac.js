var irsend = require('./irsend')

exports.on = function () {
    return irsend.send_once('ac', 'heat_24');
};

exports.off = function () {
    return irsend.send_once('ac2', 'key_off');
};

exports.set = function (data) {
    var btn = '';
    if (data.mode == 'hot') {
        btn = 'heat_';
    }
    else if (data.mode == 'cold'){
        btn = 'cool_';
    }

    btn += data.temp;

    return irsend.send_once('ac', btn);
};
