var irsend = require('./irsend')

exports.on = function () {
    return irsend.send_once('denon', 'key_0');
}
exports.off = function () {
    return irsend.send_once('denon', 'key_power');
}
exports.watch = function (device) {
    var key = '';
    switch (device) {
        case 'cable':
            key = 'key_0';
            break;
        case 'tv':
            key = 'key_7';
            break;
        case 'chrome':
            key = 'key_1';
            break;
        case 'pi':
            key = 'key_2';
            break;
        case 'xbox':
            key = 'key_3';
            break;
    }

    return irsend.send_once('denon', key);
}
