const supertest = require('supertest');
const fs = require('fs');

const server = supertest.agent('http://localhost:8080');

describe('GET /submit?name=god', () => {
    it('check if god exists', (done) => {
        server
            .get('/submit?name=god')
            .expect('Content-Type', 'text\/plain; charset=utf-8')
            .expect(200, 'god does not exist', done);
    });
});

describe('GET /submit?name=./test/file.txt', () => {
    it('check file "./test/file.txt"', (done) => {
        server
            .get('/submit?name=./test/file.txt')
            .expect('Content-Type', 'text\/plain; charset=utf-8')
            .expect(200, 'KONRAD\r\n', done);
    });
});

describe('GET /submit?name=.', () => {
    it('check directory "."', (done) => {
        server
            .get('/submit?name=.')
            .expect('Content-Type', 'text\/plain; charset=utf-8')
            .expect(200, 'it\'s a directory', done);
    });
});
