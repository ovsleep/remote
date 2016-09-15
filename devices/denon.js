var irsend = require('./irsend')
const CommandExecutor = require('../commandExecutor');

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


exports.volume = function (option) {
    var key = '';
    if (option == 'up') {
        key = 'key_volumeup';
    }
    else if (option == 'down') {
        key = 'key_volumedown';
    }
    else {
        throw 'unknown option';
    }


    var cmdExec = new CommandExecutor();
    cmdExec.addCommand(irsend.send_once_data, { remote: 'denon', key: key }, 200);
    cmdExec.addCommand(irsend.send_once_data, { remote: 'denon', key: key }, 200);
    cmdExec.addCommand(irsend.send_once_data, { remote: 'denon', key: key }, 200);

    return cmdExec.execute();
}