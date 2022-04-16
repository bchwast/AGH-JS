const fs = require('fs');

const isDirectory = (path, callback) =>
    fs.lstat(path, (err, stats) =>
        !err ?
            (stats.isDirectory()
                ? callback(false, 'it\'s a directory')
                : write(path, (err, data) =>
                    err ? callback(err) : callback(false, data))
            ) : callback(false, `${path} does not exist`)
    );

const write = (path, callback) => {
    fs.readFile(path, 'utf8', (err, data) =>
        !err ? callback(err, data) : callback(err)
    );
}

exports.funs = {
    isDirectory: isDirectory,
    write: write,
};


