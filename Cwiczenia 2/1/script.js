const a = window.prompt("Tekst1","Tekst2");
console.log(a, typeof(a));

const form = document.forms[0];
const button = form.elements[2];

function submit() {
    const div = document.createElement("div");
    const text1 = document.createTextNode(form.elements[0].value);
    const text2 = document.createTextNode(form.elements[1].value);
    const space = document.createTextNode(" ");
    div.appendChild(text1);
    div.appendChild(space);
    div.appendChild(text2);
    form.after(div);
    console.log(form.elements[0].value, typeof(form.elements[0].value), form.elements[1].value, typeof(form.elements[1].value));
}

button.addEventListener("click", submit);
