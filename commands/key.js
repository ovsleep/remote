const denon = require('../devices/denon');
const cable = require('../devices/cable');
const tv = require('../devices/tv');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    var cmdExec = new CommandExecutor();

    switch (data.device) {
        case 'tv':
            cmdExec.addCommand(tv.key, data.key);
            break;
        case 'cable':
            cmdExec.addCommand(cable.key, data.key);
            break;
        case 'denon':
            cmdExec.addCommand(denon.key, data.key);
            break;
    }

    return cmdExec.execute();
}

exports.cmdName = 'key';