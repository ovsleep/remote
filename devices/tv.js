var irsend = require('./irsend')

exports.on = function () {
    return irsend.send_once('directv', 'key_ontv');
};

exports.off = function () {
    return irsend.send_once('directv', 'key_offtv');
};

exports.key = function (key) {
    return irsend.send_once('tv', key);
}
