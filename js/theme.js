const root = document.documentElement

let nightMode = false
if (localStorage.getItem("nightMode")) {
    nightMode = JSON.parse(localStorage.getItem("nightMode"))
}
// console.log(nightMode)

function setVariable(root, prop, val) {
    root.style.setProperty(`--${prop}`, val)
}
function setVariables(props) {
    for (let prop in props) {
        setVariable(root, prop, props[prop])
    }
}

const light = {
    "bg-color": "#f2f2f2",
    "bg1-color": "white",
    "color": "rgb(80, 80, 80)",
    "highlight-color": "#f2f2f2",
    "border-color": "white",
    "header-color": "#7BE4D5",
    "link-color": "#00ccc0",
    "shadow":
        "0 1px 3px 1px rgba(60, 64, 67, 0.15), 0 1px 2px 0 rgba(60, 64, 67, 0.3)",
}
const dark = {
    "bg-color": "#1e1e1e",
    "bg1-color": "#252526",
    "color": "#adadad",
    "highlight-color": "#37373d",
    "border-color": "#1e1e1e",
    "header-color": "#1e1e1e",
    "link-color": "white",
    "shadow":
        "0 1px 3px 1px rgba(0, 0, 0, 0.51),    0 1px 2px 0 rgba(60, 64, 67, 0.3)",
}

let darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
</svg>`

let lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
</svg>`

function darkMode() {
    setVariables(dark)
    document.querySelector(
        "#nightmode"
    ).innerHTML = lightIcon
    document.querySelector("#mode").innerText = "Turn OFF night mode"
}
function lightMode() {
    setVariables(light)
    document.querySelector(
        "#nightmode"
    ).innerHTML = darkIcon
    document.querySelector("#mode").innerText = "Turn ON night mode"
}
function setMode() {
    if (nightMode) darkMode()
    //dark
    else lightMode() //light
}
setMode()
function checkMode() {
    let match = window.matchMedia("(prefers-color-scheme: dark)").matches
    nightMode = match
    console.log(match)
    if (match) {
        darkMode()
    }
}

document.querySelector("#nightmode").onclick = () => {
    nightMode = !nightMode
    localStorage.setItem("nightMode", nightMode)
    setMode()
}

window.onload = checkMode()


