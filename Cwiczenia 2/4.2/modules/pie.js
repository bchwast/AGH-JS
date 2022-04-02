const colors = [
    "red", "blue", "green", "yellow", "grey", "orange", "pink", "brown"
];
const margin = 50;
const labelMargin = 20;

function drawPieSlice(ctx, x0, y0, r, phi0, phi, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.arc(x0, y0, r, phi0, phi);
    ctx.closePath();
    ctx.fill();
}

function drawLabel(ctx, x0, y0, r, phi, value) {
    const x = x0 + (r + labelMargin) * Math.cos(phi) - ctx.measureText(value).width / 2;
    const y = y0 + (r + labelMargin) * Math.sin(phi);
    ctx.fillStyle = "black";
    ctx.font = "12pt Comic Sans MS";
    ctx.textBaseline = "middle";
    ctx.fillText(value, x, y);
}

function drawPieChart(canvas, data) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = parseInt(window.getComputedStyle(canvas).width);
    const height = parseInt(window.getComputedStyle(canvas).height);
    const x0 = width / 2;
    const y0 = height / 2;
    const r = Math.min(x0, y0) - margin;

    let total = 0;
    data.forEach(el => total += el)

    let phi0 = 0;
    let phi;
    if (Array.isArray(data)) {
        for (const i in data) {
            phi = phi0 + (data[i] / total) * 2 * Math.PI;

            const color = data.length <= colors.length ? colors[i] : colors[i % colors.length];

            drawPieSlice(ctx, x0, y0, r, phi0, phi, color);
            drawLabel(ctx, x0, y0, r, (phi0 + phi) / 2, i + ": " + data[i].toFixed(2))
            phi0 = phi
        }
    }
    if (data instanceof Map || data instanceof Set) {
        let i = 0;
        for (const key of data.keys()) {
            phi = phi0 + (data.get(key) / total) * 2 * Math.PI;

            const color = data.size <= colors.length ? colors[i] : colors[i % colors.length];

            drawPieSlice(ctx, x0, y0, r, phi0, phi, color);
            drawLabel(ctx, x0, y0, r, (phi0 + phi) / 2, key + ": " + data.get(key).toFixed(2))
            phi0 = phi
            i++;
        }
    }
}


export {drawPieChart}
