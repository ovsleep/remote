const denon = require('../devices/denon');
const CommandExecutor = require('../commandExecutor');

exports.execute = function (data) {
    return denon.volume(data.option);
}

exports.cmdName = 'volume';