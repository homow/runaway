// variables
const rootElem = document.querySelector(':root');
const changeTheme = document.querySelector(".theme i");
const customMenu = document.querySelector('.wrapper__custom-context-menu');
const openMenu = document.querySelector('.open__nav-menu i');
const navMenu = document.querySelector('.nav-menu');

// disable links
document.querySelectorAll("body a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
    })
})

// ----------------- context menu ----------------
// open context menu
const contextMenuHandler = event => {
    event.preventDefault();
    customMenu.style.display = 'flex';
    const spaceBelow = window.innerHeight + window.scrollY - (event.pageY + customMenu.offsetHeight)

    customMenu.style.top = spaceBelow < 0 ? `${event.pageY - customMenu.offsetHeight}px` : customMenu.style.top = `${event.pageY}px`
    customMenu.style.left = `${event.pageX}px`
}
// close context menu with click
const closeContextMenu = event => {
    if (customMenu.style.display !== 'none' && !event.target.matches(".wrapper__custom-context-menu *")) {
        customMenu.style.display = 'none';
    }
}

// close context menu withe escape
const closeContextMenuKey = event => {
    if (customMenu.style.display !== 'none' && event.key === 'Escape') {
        customMenu.style.display = 'none';
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

// ----------------- open nav menu -----------------
const openMenuHandler = (menu, event) => {
    if (event.target.classList.contains("fa-bars")) {
        menu.style.left = "0"
        event.target.className = "fa fa-close"
    } else {
        menu.style.left = "-160px"
        event.target.className = "fa fa-bars"
    }
}

// events
document.body.addEventListener("contextmenu", contextMenuHandler); // context menu
document.addEventListener("keydown", closeContextMenuKey); // closes menu with escape
document.body.addEventListener("click", closeContextMenu) // closes context menu
changeTheme.addEventListener("click", changeThemeHandler.bind(null, rootElem)); // changes theme
setTheme(changeTheme, rootElem); // sets theme
openMenu.addEventListener("click", openMenuHandler.bind(null, navMenu));
