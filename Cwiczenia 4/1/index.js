const modules = require('./modules.js');

const argv = process.argv.slice(2);

const x = Number(argv[0]);
const y = Number(argv[1]);

const op = new modules.Operation(x, y);
console.log(op.sum());


