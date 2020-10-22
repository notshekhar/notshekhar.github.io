const root = document.documentElement

let nightMode = false
if (localStorage.getItem("nightMode")) {
    nightMode = JSON.parse(localStorage.getItem("nightMode"))
}

function darkMode() {
    root.style.setProperty("--bg-color", "#1e1e1e")
    root.style.setProperty("--bg1-color", "#252526")
    root.style.setProperty("--color", "#adadad")
    root.style.setProperty("--highlight-color", "#37373d")
    root.style.setProperty("--border-color", "#1e1e1e")
    root.style.setProperty("--header-color", "#1e1e1e")
    root.style.setProperty("--link-color", "white")
    root.style.setProperty(
        "--shadow",
        "0 1px 3px 1px rgba(0, 0, 0, 0.51),    0 1px 2px 0 rgba(60, 64, 67, 0.3)"
    )
    document.querySelector(
        "#nightmode"
    ).innerHTML = `<svg viewBox="0 0 26 26"><g><path d="M13 20.673c-.414 0-.75-.336-.75-.75V14.46c0-.414.336-.75.75-.75s.75.336.75.75v5.463c0 .414-.336.75-.75.75z"></path><path d="M13 4.5c-4.687 0-8.5 3.813-8.5 8.5 0 3.424 2.037 6.494 5.19 7.83.094.04.196.067.306.067.414 0 .75-.336.75-.75 0-.31-.188-.575-.456-.69C7.685 18.36 6 15.826 6 13c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.825-1.683 5.358-4.288 6.454-.273.112-.467.38-.467.693 0 .414.336.75.75.75.105 0 .204-.022.294-.06C19.455 19.51 21.5 16.433 21.5 13c0-4.687-3.813-8.5-8.5-8.5zm4 18.25c0 .414-.34.75-.757.75H9.757c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h6.486c.418 0 .757.336.757.75zm-1 2.5c0 .414-.34.75-.757.75h-4.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h4.486c.418 0 .757.336.757.75z"></path></g></svg>`
    document.querySelector("#mode").innerText = "Turn OFF night mode"
}
function lightMode() {
    root.style.setProperty("--bg-color", "white")
    root.style.setProperty("--bg1-color", "white")
    root.style.setProperty("--color", "rgb(20, 20, 20)")
    root.style.setProperty("--highlight-color", "#f2f2f2")
    root.style.setProperty("--border-color", "white")
    root.style.setProperty("--header-color", "#7BE4D5")
    // root.style.setProperty("--link-color", "green")
    root.style.setProperty("--link-color", "#ff487a")
    root.style.setProperty(
        "--shadow",
        "0 1px 3px 1px rgba(60, 64, 67, 0.15), 0 1px 2px 0 rgba(60, 64, 67, 0.3)"
    )
    document.querySelector(
        "#nightmode"
    ).innerHTML = `<svg viewBox="0 0 26 26"><g><path d="M13 20.673c-.414 0-.75-.336-.75-.75V14.46c0-.414.336-.75.75-.75s.75.336.75.75v5.463c0 .414-.336.75-.75.75z"></path><path d="M13 4.5c-4.687 0-8.5 3.813-8.5 8.5 0 3.424 2.037 6.494 5.19 7.83.094.04.196.067.306.067.414 0 .75-.336.75-.75 0-.31-.188-.575-.456-.69C7.685 18.36 6 15.826 6 13c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.825-1.683 5.358-4.288 6.454-.273.112-.467.38-.467.693 0 .414.336.75.75.75.105 0 .204-.022.294-.06C19.455 19.51 21.5 16.433 21.5 13c0-4.687-3.813-8.5-8.5-8.5zM13 3c-.414 0-.75-.34-.75-.757V.757C12.25.34 12.586 0 13 0s.75.34.75.757v1.486c0 .418-.336.757-.75.757zM3 13c0 .414-.34.75-.757.75H.757C.34 13.75 0 13.414 0 13s.34-.75.757-.75h1.486c.418 0 .757.336.757.75zm23 0c0 .414-.34.75-.757.75h-1.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h1.486c.418 0 .757.336.757.75zM5.93 5.93c-.294.292-.77.29-1.067-.006l-1.05-1.05c-.296-.296-.298-.774-.005-1.066s.77-.29 1.066.005l1.05 1.05c.295.296.298.773.005 1.066zm16.262-2.122c.293.293.29.77-.005 1.066l-1.05 1.05c-.296.296-.774.3-1.067.006s-.29-.77.005-1.066l1.05-1.05c.297-.297.775-.3 1.067-.006zM17 22.75c0 .414-.34.75-.757.75H9.757c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h6.486c.418 0 .757.336.757.75zm-1 2.5c0 .414-.34.75-.757.75h-4.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h4.486c.418 0 .757.336.757.75z"></path></g></svg>`
    document.querySelector("#mode").innerText = "Turn ON night mode"
}
function setMode() {
    if(nightMode) darkMode() //dark
    else lightMode() //light
}
setMode()

document.querySelector("#nightmode").onclick = () => {
    nightMode = !nightMode
    localStorage.setItem("nightMode", nightMode)
    setMode()
}

let match = window.matchMedia("perfers-color-scheme: dark").matches
nightMode = match
if (match) {
    darkMode()
}
