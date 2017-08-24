const denon = require('../devices/denon');
const cable = require('../devices/cable');
const tv = require('../devices/tv');
const ac = require('../devices/ac');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    var cmdExec = new CommandExecutor();

    switch (data.device) {
        case 'tv':
            cmdExec.addCommand(denon.off);
            cmdExec.addCommand(tv.off);
            cmdExec.addCommand(cable.off);
            cmdExec.addCommand(xbox.off);
            break;
        case 'ac':
            cmdExec.addCommand(ac.off);
            break;
        case 'all':
            cmdExec.addCommand(denon.off);
            cmdExec.addCommand(tv.off);
            cmdExec.addCommand(cable.off);
            cmdExec.addCommand(ac.off);
            cmdExec.addCommand(xbox.off);
            break;
    }

    return cmdExec.execute();
}

exports.cmdName = 'off';
