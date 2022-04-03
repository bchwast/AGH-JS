const colors = [
    "red", "blue", "green", "yellow", "grey", "orange", "pink", "brown"
];
const margin = 50;
const barMargin = 20;

function drawAxis(ctx, height, width) {
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawXLabels(ctx, height, width, barWidth, labels) {
    ctx.fillStyle = "black";
    ctx.font = "12pt Comic Sans MS";
    for (const i in labels) {
        const x = margin + barMargin + i * (barWidth + barMargin) + barWidth / 2 - ctx.measureText(labels[i]).width / 2;
        const y = height - margin + 10;
        ctx.textBaseline = "top";
        ctx.fillText(labels[i], x, y);
    }
}

function drawYLabels(ctx, height, width, maximum) {
    ctx.fillStyle = "black";
    ctx.font = "12pt Comic Sans MS";
    let i = 0;
    while (i < 10) {
        const y = height - height * (i / 11) - margin;
        ctx.textBaseline = "bottom";
        ctx.fillText((i * (maximum / 9)).toFixed(2).toString(), 0, y);
        i++;
    }
}

function drawLabel(ctx, x, y, value) {
    ctx.fillStyle = "black";
    ctx.font = "12pt Comic Sans MS";
    ctx.textBaseline = "top";
    ctx.fillText(value, x, y);
}

function drawBar(ctx, x0, y0, width, height, color) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y0 - height);
    ctx.lineTo(x0 + width, y0 - height);
    ctx.lineTo(x0 + width, y0);
    ctx.lineTo(x0, y0);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawBarChart(canvas, data) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = parseInt(window.getComputedStyle(canvas).width);
    const height = parseInt(window.getComputedStyle(canvas).height);

    let maximum;
    let barWidth;
    let xLabels;
    if (Array.isArray(data)) {
        maximum = Math.max(...data);
        barWidth = (width - 2 * margin - (data.length + 1) * barMargin) / data.length;
        xLabels = [...Array(data.length).keys()]
    }
    if (data instanceof Map || data instanceof Set) {
        maximum = Math.max(...data.values());
        barWidth = (width - 2 * margin - (data.size + 1) * barMargin) / data.size;
        xLabels = [...data.keys()];
    }

    const y0 = height - margin;

    drawAxis(ctx, height, width);
    drawXLabels(ctx, height, width, barWidth, xLabels);
    drawYLabels(ctx, height, width, maximum);

    if (Array.isArray(data)) {
        for (const i in data) {
            const x0 = margin + barMargin + i * (barWidth + barMargin);
            const barHeight = (data[i] / maximum) * (height - 2 * margin);
            const color = data.length <= colors.length ? colors[i] : colors[i % colors.length];
            drawBar(ctx, x0, y0, barWidth, barHeight, color);
            drawLabel(ctx, x0 + (barWidth / 4), y0 - barHeight - 15, data[i].toFixed(2));
        }
    }
    if (data instanceof Map || data instanceof Set) {
        let i = 0;
        for (const key of data.keys()) {
            const x0 = margin + barMargin + i * (barWidth + barMargin);
            const barHeight = (data.get(key) / maximum) * (height - 2 * margin);
            const color = data.size <= colors.length ? colors[i] : colors[i % colors.length];
            drawBar(ctx, x0, y0, barWidth, barHeight, color);
            drawLabel(ctx, x0 + (barWidth / 4), y0 - barHeight - 15, data.get(key).toFixed(2));
            i++;
        }
    }
}


export {drawBarChart}
