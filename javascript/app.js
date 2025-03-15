// variables
const rootElem = document.querySelector(':root');
const changeTheme = document.querySelector(".theme i");
const customMenu = document.querySelector('.wrapper__custom-context-menu');
const openMenu = document.querySelector('.open__nav-menu i');
const navMenu = document.querySelector('.nav-menu');

// ----------------- context menu ----------------
// open context menu
const contextMenuHandler = (menu, event) => {
    event.preventDefault();

    if (!menu.contains(event.target)) {
        menu.style.display = 'flex';
        const spaceBelow = window.innerHeight + window.scrollY - (event.pageY + menu.offsetHeight)
        const spaceRight = window.innerWidth - (event.pageX + menu.offsetWidth)

        menu.style.top = spaceBelow < 0 ? `${event.pageY - menu.offsetHeight}px` : `${event.pageY}px`
        menu.style.left = spaceRight < 0 ? `${event.pageX - menu.offsetWidth}px` : `${event.pageX}px`
    }
}
// close context menu with click
const closeContextMenu = (menu, event) => {
    if (menu.style.display !== 'none' && !event.target.matches(".wrapper__custom-context-menu *")) {
        menu.style.display = 'none';
    }
}

// close context menu withe escape
const closeContextMenuKey = (menu, event) => {
    if (menu.style.display !== 'none' && event.key === 'Escape') {
        menu.style.display = 'none';
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
const openMenuHandler = (menu, event) => {
    event.stopPropagation()

    if (event.target.classList.contains("fa-bars")) {
        menu.style.left = "0"
        event.target.className = "fa fa-close"
    } else {
        menu.style.left = "-160px"
        event.target.className = "fa fa-bars"
    }
}

//close nav menu
const closeNavMenu = (menu, btn, cstMenu, event) => {
    const elems = [menu, cstMenu]
    const checkClick = elems.every(elem => {return !elem.contains(event.target)}) // Check that the click is outside these elements.

    if (checkClick) {
        menu.style.left = "-160px"
        btn.className = "fa fa-bars"
    }
}

// events
document.body.addEventListener("dblclick", contextMenuHandler.bind(null, customMenu)) // context menu
document.body.addEventListener("contextmenu", contextMenuHandler.bind(null, customMenu)); // context menu
document.body.addEventListener("keydown", closeContextMenuKey.bind(null, customMenu)); // closes menu with escape
document.body.addEventListener("click", closeContextMenu.bind(null, customMenu)) // closes context menu
changeTheme.addEventListener("click", changeThemeHandler.bind(null, rootElem)); // changes theme
setTheme(changeTheme, rootElem); // sets theme
openMenu.addEventListener("click", openMenuHandler.bind(null, navMenu)); // open nav menu
document.body.addEventListener("click", closeNavMenu.bind(null, navMenu, openMenu, customMenu)) // close nav menu

// disable links
document.querySelectorAll("body a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
    })
})
