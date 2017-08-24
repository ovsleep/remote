var irsend = require('./irsend')

exports.on = function () {
    return irsend.send_once('xbox', 'on');
};

exports.off = function () {
    return irsend.send_once('xbox', 'off');
};

exports.key = function (key) {
    return irsend.send_once('xbox', key);
}
