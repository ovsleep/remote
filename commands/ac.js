const denon = require('../devices/denon');
const cable = require('../devices/cable');
const tv = require('../devices/tv');
const ac = require('../devices/ac');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    var cmdExec = new CommandExecutor();

    if (data.mode == 'off') {
        cmdExec.addCommand(ac.off);
    }
    else {
        cmdExec.addCommand(ac.set, { mode: data.mode, temp: data.temp });
    }

    return cmdExec.execute();
}

exports.cmdName = 'ac';