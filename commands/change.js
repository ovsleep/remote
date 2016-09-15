const denon = require('../devices/denon');
const cable = require('../devices/cable');
const tv = require('../devices/tv');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    var cmdExec = new CommandExecutor();

    cmdExec.addCommand(cable.on);
    cmdExec.addCommand(tv.on);
    cmdExec.addCommand(denon.watch, 'cable');
    cmdExec.addCommand(cable.ok); //in case directv is in sleep mode
    cmdExec.addCommand(cable.channel, data.channel);
    
    return cmdExec.execute();
}

exports.cmdName = 'change';