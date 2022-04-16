const fs = require('fs');

const exist = (path) => fs.existsSync(path);

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

const write = (path) => {
    const data = fs.readFileSync(path, 'utf8');
    console.log(data);
}

const main = () => {
    const path = process.argv.slice(2)[0];
    if (exist(path)) {
        if (!isDirectory(path)) {
            write(path);
        } else {
            console.log('it\'s a directory');
        }
    } else {
        console.log('file does not exist');
    }
}

if (require.main === module) {
    main();
}

exports.funcs = {
    exist: exist,
    isDirectory: isDirectory,
};
