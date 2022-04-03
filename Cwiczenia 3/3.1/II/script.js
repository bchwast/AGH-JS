class ArtificialSpan extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: "open"});
        let interval = -1;
        let zero = false;
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(val) {
        return this.setAttribute("value", val);
    }

    static get observedAttributes() {
        return ["value"];
    }

    decrement() {
        this.value = this.value > 0 ? this.value - 1 : 0;
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "value") {
            this.render();
            if (newVal === "0") {
                if (this.zero) {
                    document.getElementById("licznik").value = "0";
                    this.zero = false;
                }
            }
        }
    }

    connectedCallback() {
        this.render();
        const start = document.getElementById("start");
        start.addEventListener("click", () => {
            window.clearInterval(this.interval);
            const licznik = document.getElementById("licznik");;
            if (licznik.value > 0) {
                this.value = licznik.value;
                this.zero = true;
            }
            this.interval = window.setInterval(() => this.decrement(), 1000);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `<span>${this.value}</span>`;
    }

}

customElements.define('artificial-span', ArtificialSpan);
