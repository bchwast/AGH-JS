class GameTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.addEventListener("stop", () => window.clearInterval(this.interval));
    }

    get interval() {
        return this.getAttribute("interval");
    }

    get score() {
        return this.getAttribute("score");
    }

    get time() {
        return this.getAttribute("time");
    }

    set interval(value) {
        this.setAttribute("interval", value);
    }

    set score(value) {
        this.setAttribute("score", value);
    }

    set time(value) {
        this.setAttribute("time", value);
    }

    static get observedAttributes() {
        return ["interval", "score", "time"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === "score") this.dispatchEvent(new CustomEvent("score"));
        if (prop === "time") this.dispatchEvent(new CustomEvent("time"));
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const table = document.createElement("table");

        const tr_header = document.createElement("tr");
        const th_score = document.createElement("th");
        const th_time = document.createElement("th");
        th_score.innerText = "Score";
        th_time.innerText = "Time";
        tr_header.appendChild(th_score);
        tr_header.appendChild(th_time);

        const tr_body = document.createElement("tr");
        const scoreCell = document.createElement("th");
        const timeCell = document.createElement("th");
        scoreCell.innerText = this.score;
        timeCell.innerText = this.time;
        this.addEventListener("time", () => {
            timeCell.innerText = this.time;
        });
        this.addEventListener("score", () => {
            scoreCell.innerText = this.score
        });
        tr_body.appendChild(scoreCell);
        tr_body.appendChild(timeCell);

        table.appendChild(tr_header);
        table.appendChild(tr_body);

        this.shadowRoot.appendChild(table);
    }

    start() {
        this.interval = window.setInterval(() => {
            this.time = this.time > 0 ? this.time - 1 : 0;
            if (this.time === "0") this.dispatchEvent(new CustomEvent("stop"));
        }, 1000);
    }
}

export {GameTable};
