import {drawBarChart} from "./plots/bar.js";
import {drawPieChart} from "./plots/pie.js";

const SetIntervalTime = []
const SetTimeoutTime = []
const N = 20;
let delay = document.getElementById("delay").value;
let intervalId = 0;
let timeoutId = 0;
let animationFrameId = 0;
document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);


function doTimeConsumingCalculationsWithSetInterval() {
    SetIntervalTime.push(performance.now());
    if (SetIntervalTime.length > N) SetIntervalTime.shift();
    calculatePrimes(1000, 1000000);
}

function doTimeConsumingCalculationsWithSetTimeout() {
    SetTimeoutTime.push(performance.now());
    if (SetTimeoutTime.length > N) SetTimeoutTime.shift();
    calculatePrimes(1000, 1000000);
    timeoutId = window.setTimeout(doTimeConsumingCalculationsWithSetTimeout, delay);
}

function getAverageExecutionTime(array) {
    let sum = 0;
    array.forEach((val, ind, array) => {
        if (ind !== 0) sum += (val - array[[ind - 1]]);
    });
    return sum / (array.length - 1);
}

function calculatePrimes(iterations, multiplier) {
    const primes = [];
    for (let i = 0; i < iterations; i++) {
        const candidate = i * (multiplier * Math.random());
        let isPrime = true;
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(candidate);
        }
    }
    return primes;
}

function drawChart() {
    const averageIntervalTime = getAverageExecutionTime(SetIntervalTime);
    const averageTimeoutTime = getAverageExecutionTime(SetTimeoutTime);
    const bar = document.getElementById("bar");
    const pie = document.getElementById("pie");
    drawBarChart(bar, new Map([["avg int time", averageIntervalTime], ["avg timeout time", averageTimeoutTime]]));
    drawPieChart(pie, new Map([["avg int time", averageIntervalTime], ["avg timeout time", averageTimeoutTime]]));
    animationFrameId = window.requestAnimationFrame(drawChart);
}

function start() {
    delay = document.getElementById("delay").value;
    intervalId = window.setInterval(doTimeConsumingCalculationsWithSetInterval, delay);
    timeoutId = window.setTimeout(doTimeConsumingCalculationsWithSetTimeout, delay);
    animationFrameId = window.requestAnimationFrame(drawChart);
}

function stop() {
    window.clearInterval(intervalId);
    window.clearTimeout(timeoutId);
    window.cancelAnimationFrame(animationFrameId);
    SetIntervalTime.length = 0;
    SetTimeoutTime.length = 0;
}
