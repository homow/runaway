// disables all links
document.body.querySelectorAll("body a").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
}))

// for reload page
document.body.querySelector(".reload").addEventListener("click", () => {
    location.reload();
});

// variables
const rootElem = document.querySelector(':root');
const changeTheme = document.querySelector(".theme i");
const customMenu = document.querySelector('.wrapper__custom-context-menu');
const btnNavMenu = document.querySelector('.btn__nav-menu i');
const navMenu = document.querySelector('.nav-menu');

// stack variables for open and close elements
let elementStack = []

const checkStack = (elems, type) => {
    if (!elementStack.some(el => el.element === elems)) {
        elementStack.push({element: elems, type});
    }
}

// ----------------- context menu ----------------
// open context menu
const openContextMenu = (menu, event) => {
    event.preventDefault();

    if (!menu.contains(event.target)) {
        menu.classList.add('open');
        checkStack(menu, "contextMenu");
        const spaceBelow = window.innerHeight + window.scrollY - (event.pageY + menu.offsetHeight)
        const spaceRight = window.innerWidth - (event.pageX + menu.offsetWidth)

        menu.style.top = spaceBelow < 0 ? `${event.pageY - menu.offsetHeight}px` : `${event.pageY}px`
        menu.style.left = spaceRight < 0 ? `${event.pageX - menu.offsetWidth}px` : `${event.pageX}px`
    }
}

// ---------------------- theme ------------------
// changes theme
const changeThemeHandler = (root, event) => {
    const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "light" : "dark";
    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(event.target, root)
}

// sets theme
const setTheme = (wrapper, root) => {
    const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "dark" : "light";
    root.classList.toggle("dark", theme === "dark")
    wrapper.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// ----------------- nav menu -----------------
// open nav menu
const openNavMenu = (menu ,event) => {
    event.stopPropagation()

    if (event.target.classList.contains("fa-bars")) {
        checkStack(menu, "navMenu");
        menu.classList.add("open__nav-menu")
        event.target.className = "fa fa-close"
    } else {
        elementStack.splice(elementStack.findIndex(el => el.element === menu), 1)
        menu.classList.remove("open__nav-menu");
        event.target.className = "fa fa-bars"
    }
}

// ------------ closes open element ----------
// closes elem base func
const closeElemFunc = (lastElem) => {
    switch (true) {
        case lastElem.type === "contextMenu":
            lastElem.element.classList.remove("open")
            break;
        case lastElem.type === "navMenu":
            lastElem.element.classList.remove("open__nav-menu")
            btnNavMenu.className = "fa fa-bars"
            break;
        default:
            break;
    }
}

// closes elem with click on body
const clickCloseElem = (menu, event) => {
    if (!menu.contains(event.target) && elementStack.length > 0) {
        const elem = elementStack[elementStack.length - 1]
        closeElemFunc(elem)
        elementStack.pop()
    }
}

// closes elem with escape
const keyCloseElem = event => {
    if ((event.key === "Escape" || +event.keyCode === 27) && elementStack.length > 0) {
        const elem = elementStack.pop()
        closeElemFunc(elem)
    }
}

// callback events
document.addEventListener("contextmenu", openContextMenu.bind(null, customMenu)); // context menu
changeTheme.addEventListener("click", changeThemeHandler.bind(null, rootElem)); // changes theme
setTheme(changeTheme, rootElem); // sets theme
btnNavMenu.addEventListener("click", openNavMenu.bind(null, navMenu)); // open nav menu
document.addEventListener("keydown", keyCloseElem); // closes all element with escape
document.addEventListener("click", clickCloseElem.bind(null, customMenu)) // closes all element with click on body
navMenu.addEventListener("click", event => event.stopPropagation()) // disable closes on menu
