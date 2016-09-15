var CommandExecutor = function () {
    var cmdList = [];

    function deferredExecute(func, wait) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                func.cmd(func.data).then(() => { resolve() });
            }, func.wait);
        });
    }

    this.addCommand = function (command, data, wait) {
        cmdList.push({ cmd: command, data: data, wait: wait });
    }

    this.execute = function () {
        //executes the commands in serie using promises
        var result = Promise.resolve();

        try{
            cmdList.forEach((func) => {
                if (func.wait) {
                   
                    result = result.then(() => { return deferredExecute(func, func.wait); });
                }
                else {
                    result = result.then(() => { return func.cmd(func.data); });
                }
            });
        }
        catch (err){
            console.log('error' + err);
            result.reject(err);
        }
        return result;
    }
}


module.exports = CommandExecutor;

