const expect = require('chai').expect;
const script = require('../script');

describe('exist test', () => {
    it('check if "god" exists', () => {
        expect(script.funcs.exist('god')).to.equal(false);
    });
    it('check if "file.txt" exists', () => {
        expect(script.funcs.exist('test/file.txt')).to.equal(true);
    });
});

describe('isDirectory test', () => {
    it('check if "." is directory', () => {
        expect(script.funcs.isDirectory('.')).to.equal(true);
    });
    it('check if "file.txt" is directory', () => {
        expect(script.funcs.isDirectory('test/file.txt')).to.equal(false);
    });
});

