const denon = require('../devices/denon');
const tv = require('../devices/tv');
const cable = require('../devices/cable');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    var cmdExec = new CommandExecutor();
    cmdExec.addCommand(tv.on);

    if (data.device == 'cable') {
        cmdExec.addCommand(cable.on);
        cmdExec.addCommand(cable.ok); //in case directv is in sleep mode
    }
    else {
        cmdExec.addCommand(cable.off);
    }

    cmdExec.addCommand(denon.watch, data.device);

    return cmdExec.execute();
}

exports.cmdName = 'watch';