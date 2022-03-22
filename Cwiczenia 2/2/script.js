"use strict";

var expect = chai.expect;

function sum(x,y) {
    return x+y;
}

describe('The sum() function', function() {
    it('Returns 4 for 2+2', function() {
        expect(sum(2,2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function() {
        expect(sum(-2,2)).to.equal(0);
    });
});

let nums = 0;

function cyfry(input) {
    let sum = 0;
    for (let char of input) {
        if (!isNaN(parseInt(char, 10))) {
            sum += parseInt(char, 10);
        }
    }
    return sum;
}

function litery(input) {
    let cnt = 0;
    for (let char of input) {
        if (isNaN(parseInt(char, 10))) {
            cnt += 1;
        }
    }
    return cnt;
}

function suma(input) {
    if (!isNaN(parseInt(input, 10))) {
        nums += parseInt(input, 10);
    }
    return nums;
}


function main() {
    let input = window.prompt();
    if (input !== null) {
        const div = document.createElement("div");
        const input_text = document.createElement("p");
        input_text.innerText = input;
        const f1_output = document.createElement("span");
        f1_output.innerText = "\t" + cyfry(input);
        f1_output.style.color = "red";
        const f2_output = document.createElement("span");
        f2_output.innerText = "\t" + litery(input);
        f2_output.style.color = "green";
        const f3_output = document.createElement("span");
        f3_output.innerText = "\t" + suma(input);
        f3_output.style.color = "blue";
        div.appendChild(input_text);
        div.appendChild(f1_output);
        div.appendChild(f2_output);
        div.appendChild(f3_output);
        const ref = document.getElementById("ref");
        ref.appendChild(div);
        window.setTimeout(main, 0);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    describe("The cyfry() function", function() {
        it("returns 15 for \"12345\"", function () {
            expect(cyfry("12345")).to.equal(15);
        });
        it("returns 0 for \"asdasdasd\"", function () {
            expect(cyfry("asdasdasd")).to.equal(0);
        });
        it("returns 21 for \"asd123456\"", function () {
            expect(cyfry("asd123456")).to.equal(21);
        });
        it("returns 10 for \"1234asd\"", function () {
            expect(cyfry("1234asd")).to.equal(10);
        });
        it("returns 0 for \"\"", function () {
            expect(cyfry("")).to.equal(0);
        });
    });

    describe("The litery() function", function() {
        it("returns 0 for \"12345\"", function () {
            expect(litery("12345")).to.equal(0);
        });
        it("returns 9 for \"asdasdasd\"", function () {
            expect(litery("asdasdasd")).to.equal(9);
        });
        it("returns 3 for \"asd123456\"", function () {
            expect(litery("asd123456")).to.equal(3);
        });
        it("returns 6 for \"1234asddsa\"", function () {
            expect(litery("1234asddsa")).to.equal(6);
        });
        it("returns 0 for \"\"", function () {
            expect(litery("")).to.equal(0);
        });
    });

    describe("The suma() function", function() {
        it("returns 12345 for \"12345\"", function () {
            expect(suma("12345")).to.equal(12345);
        });
        it("returns 12345 for \"asdasdasd\"", function () {
            expect(suma("asdasdasd")).to.equal(12345);
        });
        it("returns 12345 for \"asd123456\"", function () {
            expect(suma("asd123456")).to.equal(12345);
        });
        it("returns 13579 for \"1234asd\"", function () {
            expect(suma("1234asd")).to.equal(13579);
        });
        it("returns 13579 for \"\"", function () {
            expect(suma("")).to.equal(13579);
        });
    });

    window.setTimeout(() => {
        nums = 0;
        main();
    }, 0);
});


