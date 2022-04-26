//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require('supertest');
const server1 = supertest.agent('http://localhost:3000');
const server2 = supertest.agent('http://localhost:3001');

const chai = require('chai');
const { expect } = require('chai');
chai.use(require('chai-json'));

const { x1, y1 } = require('../app1').test;
const { x2, y2 } = require('../app2').test;
const { getHtmlResponse, compute, computed } = require('../script');


describe('GET / app1', () => {
    it('respond with html', (done) => {
        server1
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((_err, res) => {
                expect(res.text).to.include(`${x1} + ${y1} = ${x1 + y1}`);
                done();
            });
    });
});

describe('GET / app2', () => {
    it('respond with html', (done) => {
        server2
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((_err, res) => {
                expect(res.text).to.include(`${x2} + ${y2} = ${x2 + y2}`);
                done();
            });
    });
});

describe('test json files', () => {
    it('json file is a json file', () => {
        expect('./json/input.json')
            .to.be.a.jsonFile()
            .and.contain.jsonWithProps({x: 14, y: 7, operation: '+'});
    });
});

describe('test compute', () => {
    it('returns 17 for 12 + 5', () => {
        expect(compute('+', 12, 5)).to.be.equal(17);
    });
    it('returns 5 for 25 - 20', () => {
        expect(compute('-', 25, 20)).to.be.equal(5);
    });
    it('returns 66 for 22 * 3', () => {
        expect(compute('*', 22, 3)).to.be.equal(66);
    });
    it('returns 11 for 143 / 13', () => {
        expect(compute('/', 143, 13)).to.be.equal(11);
    });
    it('returns Infinity for 4 / 0', () => {
        expect(compute('/', 4, 0)).to.be.equal(Infinity);
    });
    it('returns NaN for 23 ? 1', () => {
        expect(compute('?', 23, 1)).to.be.NaN;
    });
});

describe('test computed', () => {
    it('response includes the same object but with result', () => {
        const json = [{x: 12, y: 5, operation: '+'}];
        expect(computed(json)).to.be.deep.equal([{operation: '+', x: 12, y: 5, result: 17}]);
    });
});

describe('test getHtmlResponse', () => {
    it('response includes table, tr, th, td tags and result', () => {
        const json = [{x: 12, y: 5, operation: '+'}];
        expect(getHtmlResponse(json))
            .to.include('<table>')
            .and.to.include('<tr>')
            .and.to.include('<th>')
            .and.to.include('<td>')
            .and.to.include('17');
    });
});

describe('GET /json/:input app1', () => {
    it('test /json/input.json (existing)', (done) => {
        server1
            .get('/json/input.json')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((_err, res) => {
                expect(res.text)
                    .to.include('<td>21</td>')
                    .and.to.include('<td>41</td>')
                    .and.to.include('<td>242</td>')
                    .and.to.include('<td>2</td>')
                    .and.to.include('<td>Infinity</td>')
                    .and.to.include('<td>NaN</td>');
                const { json1 } = require('../app1').test;
                expect(json1)
                    .to.deep.include.members([{ operation: '+', x: 14, y: 7 }])
                    .and.to.have.lengthOf(6);
                done();
            });
    });
});

describe('GET /json/:name app2', () => {
    it('test /json/input.json (existing)', (done) => {
        server2
            .get('/json/input.json')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((_err, res) => {
                expect(res.text)
                    .to.include('<td>21</td>')
                    .and.to.include('<td>41</td>')
                    .and.to.include('<td>242</td>')
                    .and.to.include('<td>2</td>')
                    .and.to.include('<td>Infinity</td>')
                    .and.to.include('<td>NaN</td>');
                const { json2 } = require('../app2').test;
                expect(json2)
                    .to.deep.include.members([{ operation: '+', x: 14, y: 7, result: 21 }])
                    .and.to.have.lengthOf(6);

                done();
            });
    });
});
