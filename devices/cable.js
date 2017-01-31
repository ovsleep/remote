var irsend = require('./irsend')
const CommandExecutor = require('../commandExecutor');

const channels = {
    DISCOVERY: '1732',
    HISTORY: '1742',
    DEPORTES: '1621',
    FX: '1217',
    FOX: '1204',
    FUTBOL: '1184'
}

exports.on = function () {
    return irsend.send_once('directv', 'key_on');
};

exports.off = function () {
    return irsend.send_once('directv', 'key_off');
};

exports.ok = function () {
    return irsend.send_once('directv', 'key_ok');
};

exports.channel = function (channel) {
    var cmdExec = new CommandExecutor();
    var numberStr = channel.toString();
    if (channels[channel]) { //in case the channel is sent by Name instead by number
        numberStr = channels[channel];
    }
    console.log(numberStr.length);
    for (i = 0; i < numberStr.length; i++) {
            var number = numberStr[i];
            var btn = 'KEY_' + number;
            cmdExec.addCommand(irsend.send_once_data, {remote: 'directv', key: btn}, 200);
        }

    return cmdExec.execute();
};

//function sendSequence(seq, idx, wait) {
//    if (idx < seq.length) {
       
//        irsend.send_once('directv', btn).then(() => {
//            setTimeout(() => { sendSequence(seq, ++idx, wait) }, wait);
//        });

//    }
//}