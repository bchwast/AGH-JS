class Circle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.addEventListener("start", () => this.start());
        window.addEventListener("keydown", e => {
            switch (e.code) {
                case "ArrowDown":
                    this.direction = "S";
                    break;
                case "ArrowUp":
                    this.direction = "N";
                    break;
                case "ArrowLeft":
                    this.direction = "W";
                    break;
                case "ArrowRight":
                    this.direction = "E";
                    break;
            }
            e.preventDefault();
        }, false);
        window.addEventListener("mousemove", e => {
            const relativeX = Number(e.clientX) - Number(this.x);
            const relativeY = Number(e.clientY) - Number(this.y);
            if (relativeX < -100) {
                this.direction = "W";
                return;
            } else if (relativeX > 100) {
                this.direction = "E";
                return;
            }
            if (relativeY < 0) {
                this.direction = "N";
            } else if (relativeY > 0) {
                this.direction = "S";
            }
        })
    }

    get direction() {
        return this.getAttribute("direction");
    }

    get radius() {
        return this.getAttribute("radius");
    }

    get speed() {
        return this.getAttribute("speed");
    }

    get stopped() {
        return this.getAttribute("stopped");
    }

    get x() {
        return this.getAttribute("x");
    }

    get y() {
        return this.getAttribute("y");
    }

    set direction(value) {
        this.setAttribute("direction", value);
    }

    set radius(value) {
        this.setAttribute("radius", value);
    }

    set speed(value) {
        this.setAttribute("speed", value);
    }

    set stopped(value) {
        this.setAttribute("stopped", value);
    }

    set x(value) {
        this.setAttribute("x", value);
    }

    set y(value) {
        this.setAttribute("y", value);
    }

    static get observedAttributes() {
        return ["direction", "radius", "speed", "stopped", "x", "y"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === "x" || prop === "y") {
            this.dispatchEvent(new CustomEvent("render"));
            this.dispatchEvent(new CustomEvent("checkCollisions"));
        }
    }

    collides(x, y) {
        const size = Number(this.radius * 2);
        const sx = Number(this.x) - size / 2;
        const sy = Number(this.y) - size / 2;
        return Math.abs(x - sx) < size && Math.abs(y - sy) < size;
    }

    connectedCallback() {
    }

    correctPosition(width, height) {
        if (this.x > width || this.x < 0) {
            this.x = (Number(this.x) + width) % width;
        }
        if (this.y > height || this.y < 0) {
            this.y = (Number(this.y) + height) % height;
        }
    }

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = "royalblue";
        ctx.fill();
    }

    nextFrame() {
        const y = Number(this.y);
        const x = Number(this.x);
        const speed = Number(this.speed);
        switch (this.direction) {
            case "N":
                this.y = y - speed;
                break;
            case "S":
                this.y = y + speed;
                break;
            case "E":
                this.x = x + speed;
                break;
            case "W":
                this.x = x - speed;
        }
        if (Number(this.stopped) === 0)
            window.requestAnimationFrame(() => {
                this.nextFrame();
            });
    }

    render(canvas) {
        const ctx = canvas.getContext("2d");
        canvas.dispatchEvent(new CustomEvent("refresh"));
        this.correctPosition(canvas.width, canvas.height);

        this.draw(ctx, this.x, this.y);

        const outRight = Number(this.x) + Number(this.radius) > canvas.width;
        const outLeft = this.x - this.radius < 0;
        const outDown = Number(this.y) + Number(this.radius) > canvas.height;
        const outUp = this.y - this.radius < 0;

        const outLeftX = Number(this.x) + canvas.width;
        const outRightX =
            ((Number(this.x) + Number(this.radius)) % canvas.width) - this.radius;
        const outDownY =
            ((Number(this.y) + Number(this.radius)) % canvas.height) - this.radius;
        const outUpY = Number(this.y) + canvas.height;

        if (outRight && outUp) this.draw(ctx, outRightX, outUpY);
        if (outRight && outDown) this.draw(ctx, outRightX, outDownY);
        if (outLeft && outUp) this.draw(ctx, outLeftX, outUpY);
        if (outLeft && outDown) this.draw(ctx, outLeftX, outDownY);

        if (outRight) this.draw(ctx, outRightX, this.y);
        if (outLeft) this.draw(ctx, outLeftX, this.y);
        if (outDown) this.draw(ctx, this.x, outDownY);
        if (outUp) this.draw(ctx, this.x, outUpY);
    }

    start() {
        this.stopped = 0;
        window.requestAnimationFrame(() => {
            this.nextFrame();
        });
    }
}

export {Circle};
