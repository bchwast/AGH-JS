import {Square} from "./Square.js";
import {Circle} from "./Circle.js";

customElements.define("game-circle", Circle);
customElements.define("game-square", Square);

class GameBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    get elementSize() {
        return this.getAttribute("elementSize");
    }

    get height() {
        return this.getAttribute("height");
    }

    get maxSquares() {
        return this.getAttribute("maxSquares");
    }

    get squares() {
        return this.getAttribute("squares");
    }

    get squareSpeed() {
        return this.getAttribute("squareSpeed");
    }

    get stopped() {
        return this.getAttribute("stopped");
    }

    get width() {
        return this.getAttribute("width");
    }

    set elementSize(value) {
        this.setAttribute("elementSize", value);
    }

    set height(value) {
        this.setAttribute("height", value);
    }

    set maxSquares(value) {
        this.setAttribute("maxSquares", value);
    }

    set squares(value) {
        this.setAttribute("squares", value);
    }

    set squareSpeed(value) {
        this.setAttribute("squareSpeed", value);
    }

    set stopped(value) {
        this.setAttribute("stopped", value);
    }

    set width(value) {
        this.setAttribute("width", value);
    }

    static get observedAttributes() {
        return ["elementSize", "height", "maxSquares", "squares", "squareSpeed", "stopped", "width"];
    }

    connectedCallback() {
        this.squares = 0;
        this.render();
    }

    createCanvas() {
        const canvas = document.createElement("canvas");

        canvas.classList.add("canvas");
        canvas.setAttribute("height", this.height);
        canvas.setAttribute("width", this.width);
        canvas.setAttribute("style", "border: 1px solid black;");

        canvas.addEventListener("remove", e => canvas.removeChild(e.object));
        canvas.addEventListener("refresh", () => {
            const ctx = canvas.getContext("2d");
            const elements = canvas.childNodes;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            elements.forEach((element) =>
                element.dispatchEvent(new CustomEvent("refresh"))
            );
        });
        return canvas;
    }


    start(levelProps) {
        this.stopped = 0;
        for (let i = 0; i < levelProps.length; i++) {
            window.setTimeout(() => {
                this.dispatchEvent(
                    new CustomEvent("propschange", {
                        detail: {
                            square: levelProps[i][0],
                            speed: levelProps[i][1],
                            ctrspeed: levelProps[i][2],
                        },
                    })
                );
                this.maxSquares = levelProps[i][0];
                this.squareSpeed = levelProps[i][2];
            }, 60000 * i);
        }

        window.setInterval(() => {
            if (
                Number(this.stopped) === 0 &&
                Number(this.squares) < Number(this.maxSquares)
            )
                this.dispatchEvent(new CustomEvent("renderSquare"));
        }, 500);
        this.dispatchEvent(new CustomEvent("start"));
    }

    createCircle(canvas, x, y, speed) {
        const circle = document.createElement("game-circle");

        this.addEventListener("start", () => circle.start());
        this.addEventListener("stop", () => (circle.stopped = 1));
        circle.addEventListener("checkCollisions", () => {
            for (const node of canvas.childNodes) {
                if (!node.isSameNode(circle) && circle.collides(node.x, node.y)) {
                    if (node.stopped === "0") {
                        node.dispatchEvent(new CustomEvent("collision"));
                        if (
                            Number(this.stopped) === 0 &&
                            Number(this.squares) < Number(this.maxSquares)
                        )
                            this.dispatchEvent(new CustomEvent("renderSquare"));
                    }
                }
            }
        });
        circle.addEventListener("score", e => this.dispatchEvent(e));
        circle.addEventListener("render", () => circle.render(canvas));
        this.addEventListener(
            "propschange",
            (e) => (circle.speed = e.detail.speed)
        );

        circle.radius = this.elementSize / 2;
        circle.x = canvas.width / 2;
        circle.y = canvas.height / 2;
        circle.speed = speed;
        circle.direction = "N";
        circle.stopped = 0;

        return circle;
    }

    createSquare(canvas, x, y) {
        const square = document.createElement("game-square");

        square.addEventListener("render", () => {
            if (Number(square.stopped) === 0) square.render(canvas);
        });
        square.addEventListener("collision", () => {
            square.stopped = 1;
            this.dispatchEvent(
                new CustomEvent("score", { detail: { points: square.value } })
            );
        });
        this.addEventListener("stop", () => (square.stopped = 1));
        this.addEventListener(
            "propschange",
            (e) => (square.speed = e.detail.ctrspeed)
        );
        square.addEventListener("stop", () => {
            square.stopped = 1;
            if (square.parentNode !== null) canvas.removeChild(square);
            this.squares = this.squares - 1;
        });
        square.value = 20;
        square.size = this.elementSize;
        square.x = x;
        square.y = y;
        square.stopped = 0;
        square.speed = this.squareSpeed;
        return square;
    }

    isFree(x, y) {
        for (const element of this.shadowRoot.firstChild.childNodes) {
            if (element.collides(x, y)) return false;
        }
        return true;
    }

    render() {
        const canvas = this.createCanvas();
        canvas.appendChild(this.createCircle(canvas, 25, 25, 10));
        this.addEventListener("renderSquare", () => this.renderSquare(canvas));

        this.dispatchEvent(new CustomEvent("refresh"));
        this.shadowRoot.appendChild(canvas);
    }

    renderSquare(canvas) {
        console.log(this.width, this.height, this.elementSize);
        const x = Math.random() * (this.width - this.elementSize);
        const y = Math.random() * (this.height - this.elementSize);
        if (this.isFree(x, y)) {
            const square = this.createSquare(canvas, x, y);
            canvas.appendChild(square);
            this.squares = Number(this.squares) + 1;
            square.start();
            square.dispatchEvent(new CustomEvent("render"));
        }
    }
}

export {GameBoard};
