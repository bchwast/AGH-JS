function init() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(120, 120, 100, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(350, 50);
    ctx.lineTo(550, 50);
    ctx.lineTo(350, 200);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.fillStyle = "green";
    ctx.fillRect(650, 50, 100, 400);
}

document.addEventListener("DOMContentLoaded", init, false);
