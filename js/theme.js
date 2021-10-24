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
    "bg1-color": "#252525",
    "color": "#adadad",
    "highlight-color": "#37373d",
    "border-color": "#1e1e1e",
    "header-color": "#1e1e1e",
    "link-color": "white",
    "shadow":
        "0 1px 3px 1px rgba(0, 0, 0, 0.51),    0 1px 2px 0 rgba(60, 64, 67, 0.3)",
}

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


