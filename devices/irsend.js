var exec = require('child_process').exec;


// Internal methods

var command = 'irsend -d /dev/lirc0 ';

function _list(remote, code) {
    if (!remote) remote = '';
    if (!code) code = '';

    return command + ' LIST "' + remote + '" "' + code + '"';
};

function _send_once(remote, code) {
    if (!remote) remote = '';
    if (!code) code = '';

    if (code instanceof Array) {
        var newCode = '';

        code.forEach(function (element, index, array) {
            newCode = newCode + '"' + element + '" ';
        });

        code = newCode.trim();
        code = code.substr(1, code.length - 2);
    }

    return command + ' SEND_ONCE "' + remote + '" "' + code + '"';
};

function _send_start(remote, code) {
    if (!remote) remote = '';
    if (!code) code = '';

    return command + ' SEND_START "' + remote + '" "' + code + '"';
};

function _send_stop(remote, code) {
    if (!remote) remote = '';
    if (!code) code = '';

    return command + ' SEND_STOP "' + remote + '" "' + code + '"';
};

function _set_transmitters(transmitters) {
    if (transmitters instanceof Array) {
        var newTransmitters = '';

        transmitters.forEach(function (element, index, array) {
            newTransmitters = newTransmitters + element + " ";
        });

        transmitters = newTransmitters.trim();
    }

    return command + ' SET_TRANSMITTERS ' + transmitters;
};

function _simulate(code) {
    return command + ' SIMULATE "' + code + '"';
};

exports.setSocket = function (socket) {
    if (socket) {
        command = 'irsend -d ' + socket;
    } else {
        command = 'irsend';
    }
}

exports.list = function (remote, code, callback) {
    var command = _list(remote, code);
    return exec(command, callback);
};

exports.send_once = function (remote, code) {
    return new Promise((resolve, reject) => {
        var command = _send_once(remote, code);
        console.log(command);
        exec(command, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });

        //setTimeout(() => { resolve(); }, 500);
    });
};

exports.send_once_data = function (data) {
    return exports.send_once(data.remote, data.key);
}

exports.send_start = function (remote, code) {
    return new Promise((resolve, reject) => {
        var command = _send_start(remote, code);
        console.log(command);
        exec(command, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.send_stop = function (remote, code) {
    return new Promise((resolve, reject) => {
        var command = _send_stop(remote, code);
        console.log(command);
        exec(command, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.set_transmitters = function (remote, code) {
    return new Promise((resolve, reject) => {
        var command = _set_transmitters(remote, code);
        console.log(command);
        exec(command, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.simulate = function (remote, code) {
    return new Promise((resolve, reject) => {
        var command = _simulate(remote, code);
        console.log(command);
        exec(command, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
