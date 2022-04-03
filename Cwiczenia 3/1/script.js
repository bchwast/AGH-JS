const add = document.getElementById("set");
const del = document.getElementById("delete");

const pageContainer = document.getElementsByClassName("page-container");
const centerContainer = document.getElementsByClassName("center-container")
const leftContainer = document.getElementsByClassName("left-container");
const animated = document.getElementsByClassName("animated")
const azure = document.getElementsByClassName("azure");
const azureKids = document.querySelectorAll(".azure > *");
const main = document.getElementsByTagName("main");
const nav = document.getElementsByTagName("nav");
const aside = document.getElementsByTagName("aside");
const h1 = document.getElementsByTagName("h1");
const h2 = document.getElementsByTagName("h2");
const li = document.getElementsByTagName("li");
const footer = document.getElementsByTagName("footer");
const all = document.getElementsByTagName("*");


add.addEventListener("click", () => {
    Array.from(document.querySelectorAll("*:not(blockquote)")).forEach(el => {
        el.style.all = "";
    })
    Array.from(all).forEach(el => {
        el.style.boxSizing = "border-box";
        el.style.margin = "0";
        el.style.padding = "0";
    })
    Array.from(pageContainer).forEach(el => {
        console.log("sheesh");
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.padding = "0.5% 1%";
        el.style.width = "100vw";
        el.style.height = "100vh";
        el.style.gap = "2%"
    });
    Array.from(centerContainer).forEach(el => {
        el.style.display = "flex";
        el.style.flexDirection = "row";
        el.style.width = "100%";
    });
    Array.from(leftContainer).forEach(el => {
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.width = "50%";
        el.style.gap = "2%";
    });
    Array.from(main).forEach(el => {
        el.style.width = "fit-content";
        el.style.marginTop = "2%";
    })
    Array.from(nav).forEach(el => {
        el.style.width = "fit-content";
        el.style.padding = "0.5rem";
    })
    Array.from(aside).forEach(el => {
        el.style.width = "50%";
        el.style.height = "fit-content";
        el.style.padding = "0.5rem"
    })
    Array.from(h1).forEach(el => el.style.fontSize = "2rem");
    Array.from(h2).forEach(el => el.style.fontSize = "1.8rem");
    Array.from(azure).forEach(el => {
        el.style.backgroundColor = "#EFF";
        el.style.border = "3px solid black";
        el.style.boxShadow = "0 0 6px 0 rgba(66, 68, 90, 1)";
    });
    Array.from(azureKids).forEach(el => el.style.margin = "0.5rem");
    Array.from(li).forEach(el => {
        el.style.marginLeft = "2.5rem";
        el.style.fontSize = "1.2rem";
    })
    Array.from(footer).forEach(el => {
        el.style.padding = "0.5rem";
        el.style.fontSize = "1.2rem";
    })
    Array.from(animated).forEach(el => {
        el.style.animationName = "color";
        el.style.animationDuration = "4s";
        el.style.animationIterationCount = "infinite";
        el.style.animationDirection = "alternate";
    });
})

del.addEventListener("click", () => {
    Array.from(document.querySelectorAll("*:not(blockquote)")).forEach(el => {
        el.style.all = "revert";
    })
})
