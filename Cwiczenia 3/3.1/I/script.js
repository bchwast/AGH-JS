const licznik = document.getElementById("licznik");
let val = licznik.value;
let interval = -1;

function setSpans(value) {
    const spans = document.getElementsByTagName("span");
    for (const span of spans) {
        for (const node of span.childNodes) {
            if (node.nodeType === node.TEXT_NODE) {
                const newTextNode = document.createTextNode(value);
                node.replaceWith(newTextNode);
            }
        }
    }
}

function decrement() {
    if (val > 0) {
        val--;
        setSpans(val);
    } else if (val === 0) {
        document.getElementById("licznik").value = 0;
        val--
    }
}

document.getElementById("start").addEventListener("click", () => {
    window.clearInterval(interval);
    if (licznik.value > 0) {
        val = licznik.value;
    }
    setSpans(val);
    interval = window.setInterval(decrement, 1000);
})
