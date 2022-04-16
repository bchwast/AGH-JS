/*
  Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'Assert'.
  If you prefer the 'Chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
  and then you need to uncomment the lines below.
*/

//----------------------------------------
// Mocha tests with CommonJS style imports
//----------------------------------------

const { expect } = require('chai');
const operation = require('../modules.js');

describe('The sum() method', () => {
  it('Returns 4 for 2+2', () => {
    const op = new operation.Operation(2, 2);
    expect(op.sum()).to.equal(4);
  });
  it('Returns 0 for -2+2', () => {
    const op = new operation.Operation(-2, 2);
    expect(op.sum()).to.equal(0);
  });
});

//-----------------------------------
// Mocha tests with ES6 style imports
//-----------------------------------

/*
- You must install the 'esm' module (https://www.npmjs.com/package/esm) — npm install esm --save-dev
- You must run tests as follows: npx mocha --require esm
Source: https://stackoverflow.com/questions/57004631/mocha-tests-with-es6-style-imports

import { Operation } from "../module";
import assert from 'assert';

describe('The sum() method', function () {
  it('Returns 4 for 2+2', function () {
    var op = new Operation(2, 2);
    assert.strictEqual(op.sum(), 4)
  });
  it('Returns 0 for -2+2', function () {
    var op = new Operation(-2, 2);
    assert.strictEqual(op.sum(), 0)
  });
});
*/
