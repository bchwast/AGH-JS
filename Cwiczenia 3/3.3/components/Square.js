class Square extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.addEventListener("refresh", () =>
            this.dispatchEvent(new CustomEvent("render"))
        );
    }

    get interval() {
        return this.getAttribute("interval");
    }

    get size() {
        return this.getAttribute("size");
    }

    get speed() {
        return this.getAttribute("speed");
    }

    get stopped() {
        return this.getAttribute("stopped");
    }

    get value() {
        return this.getAttribute("value");
    }

    get x() {
        return this.getAttribute("x");
    }

    get y() {
        return this.getAttribute("y");
    }

    set interval(value) {
        this.setAttribute("interval", value);
    }

    set size(value) {
        this.setAttribute("size", value);
    }

    set speed(value) {
        this.setAttribute("speed", value);
    }

    set stopped(value) {
        this.setAttribute("stopped", value);
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    set x(value) {
        this.setAttribute("x", value);
    }

    set y(value) {
        this.setAttribute("y", value);
    }

    static get observedAttributes() {
        return ["interval", "size", "speed", "stopped", "value", "x", "y"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === "value") {
            this.dispatchEvent(new CustomEvent("render"));
        }
        if (prop === "speed") {
            this.setInterval();
        }
    }

    collides(x, y) {
        const size = Number(this.size);
        const sx = Number(this.x);
        const sy = Number(this.y);
        return Math.abs(x - sx) / 2 < size && Math.abs(y - sy) / 2 < size;
    }

    connectedCallback() {
    }

    render(canvas) {
        const ctx = canvas.getContext("2d");
        const x = Number(this.x);
        const y = Number(this.y);
        const size = Number(this.size);
        const value = Number(this.value);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x, y);
        ctx.fillStyle = this.value > 0 ? "green" : "red";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = `${size / 2}px Comic Sans MS`;
        ctx.textAlign = "center";
        ctx.fillText(value, x + size / 2, y + (3 * size) / 4);
    }

    setInterval() {
        window.clearInterval(this.interval);
        this.interval = window.setInterval(() => {
            if (Number(this.stopped) === 0) {
                this.value = this.value - 1;
            }
            if (Number(this.value) === -20 || Number(this.stopped) === 1) {
                this.dispatchEvent(new CustomEvent("stop"));
            }
        }, 1000 / Number(this.speed));
    }

    start() {
        this.stopped = 0;
        this.setInterval();
    }
}

export {Square};
