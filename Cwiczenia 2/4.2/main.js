import {drawPieChart} from "./modules/pie.js";
import {drawBarChart} from "./modules/bar.js";

const map1 = new Map([["pies", 2], ["mazik", 3]]);
// const array1 = [3, 4, 5, 6, 9];
const array2 = [];

function pie(array) {
    const pie = document.getElementById("pie");
    drawPieChart(pie, array);
}

function bar(array) {
    const bar = document.getElementById("bar");
    drawBarChart(bar, array);
}

const pieButton = document.getElementById("showPie");
pieButton.addEventListener("click", () => {
    pie(map1));
});

const barButton = document.getElementById("showBar");
barButton.addEventListener("click", () => {
    bar(map1);
});

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    const input = document.getElementById("append");
    array2.push(parseFloat(input.value));
    pie(array2);
    bar(array2);
})
