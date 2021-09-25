//------------notshekhar-----------

let code = document.querySelector("#code")
let body = document.querySelector("#projects")
let profile = document.querySelector("#profile")
let tabHolder = document.querySelector(".tabs")
let tab = document.querySelectorAll(".tab")
let spinner = document.querySelector(".spinner")
let spacer = document.querySelector(".spacer")
let total = document.querySelector("#total")
let toptabs = document.querySelectorAll(".toptab")
let about = document.querySelector(".about")
let talks = document.querySelector(".talks")
let talkbody = document.querySelector(".talkbody")

let data
let talkdata
let highlight = 0
let totalProjects = 0
let ml = 0,
    cc = 0,
    fed = 0,
    bed = 0,
    ld = 0
let all_types = {
    all: { name: "All", logo: "" },
    ml: { name: "Machine Learning", logo: '<i class="fas fa-robot"></i>' },
    cc: {
        name: "Coding Challange",
        logo: '<i class="fas fa-laptop-code"></i>',
    },
    fed: {
        name: "Front End Development",
        logo: '<i class="fas fa-code"></i>',
    },
    bed: {
        name: "Full Stack Development",
        logo: '<i class="fas fa-server"></i>',
    },
    ld: { name: "Logo Design", logo: '<i class="fas fa-draw-polygon"></i>' },
}
//updating history
history.pushState({ title: "slasho { codebeat }", page: "home" }, "home", "./")
code.style.display = "block"


window.onkeyup = (e) => {
    if (e.key == "ArrowUp") {
        code.scrollTop = code.scrollTop - 30
    } else if (e.key == "ArrowDown") {
        code.scrollTop = code.scrollTop + 30
    }
}

document.onclick = (e) => {
    if (e.srcElement.dataset.type) {
        //getting tabs dataset type
        let tabs = e.srcElement.dataset.type
        if (window.innerWidth > 700) {
            code.scrollTo(0, 0)
        }
        if (tabs == "all") {
            totalProjects = 0
            body.innerHTML = ""
            highlight = 0
            all(data)
        } else if (tabs != "all") {
            query(tabs)
        }
        //highlighting tabs
        for (let i = 0; i < tab.length; i++) {
            if (i == highlight) {
                tab[i].classList.add("highlight")
            } else {
                tab[i].classList.remove("highlight")
            }
        }
    }
}

//making tabs skicky for mobile
window.onscroll = () => {
    let y = window.scrollY
    if (window.innerWidth < 700) {
        if (y >= 15 + window.innerHeight + tabHolder.offsetHeight) {
            tabHolder.classList.add("tab_fixed_for_mobile")
        } else {
            tabHolder.classList.remove("tab_fixed_for_mobile")
        }   
    }
}
// code.onscroll = () => {
//     let y = code.scrollTop
//     if (y >= tabHolder.offsetHeight) {
//         tabHolder.classList.add("tab_fixed")
//     } else {
//         tabHolder.classList.remove("tab_fixed")
//     }
// }


//if user is operating in mobile
if (window.innerWidth < 700) {
    //switching b/w tabs
    for (let i = 0; i < toptabs.length; i++) {
        let tab = toptabs[i]
        tab.onclick = () => {
            if (tab.dataset.url == "projects") {
                history.pushState(
                    { title: "Silly projects I've done", page: "projects" },
                    "home",
                    "projects"
                )
                document.title = "Silly projects I've done"
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "block"
                about.style.display = "none"
                talks.style.display = "none"
                tab.classList.add("h")
            } else if (tab.dataset.url == "about") {
                history.pushState(
                    { title: "Hiya! I'm Shekhar", page: "about" },
                    "about",
                    "about"
                )
                document.title = "Hiya! I'm Shekhar"
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "none"
                about.style.display = "block"
                talks.style.display = "none"
                tab.classList.add("h")
            } else if (tab.dataset.url == "talks") {
                history.pushState(
                    { title: "Talks", page: "talks" },
                    "talks",
                    "talks"
                )
                document.title = "Talks"
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "none"
                about.style.display = "none"
                talks.style.display = "block"
                tab.classList.add("h")
                talkPosts()
            }
            window.scrollTo(0, window.innerHeight)
        }
    }
}
window.onresize = () => {
    tabHolder.classList.remove("tab_fixed")
    tabHolder.classList.remove("tab_fixed_for_mobile")
    //if user is operating in mobile
    if (window.innerWidth < 700) {
        //switching b/w tabs
        for (let i = 0; i < toptabs.length; i++) {
            let tab = toptabs[i]
            tab.onclick = () => {
                if (tab.dataset.url == "projects") {
                    history.pushState(
                        { title: "Silly projects I've done", page: "projects" },
                        "home",
                        "projects"
                    )
                    document.title = "Silly projects I've done"
                    toptabs.forEach((t) => {
                        t.classList.remove("h")
                    })
                    code.style.display = "block"
                    about.style.display = "none"
                    talks.style.display = "none"
                    tab.classList.add("h")
                } else if (tab.dataset.url == "about") {
                    history.pushState(
                        { title: "Hiya! I'm Shekhar", page: "about" },
                        "about",
                        "about"
                    )
                    document.title = "Hiya! I'm Shekhar"
                    toptabs.forEach((t) => {
                        t.classList.remove("h")
                    })
                    code.style.display = "none"
                    about.style.display = "block"
                    talks.style.display = "none"
                    tab.classList.add("h")
                } else if (tab.dataset.url == "talks") {
                    history.pushState(
                        { title: "Talks", page: "talks" },
                        "talks",
                        "talks"
                    )
                    document.title = "Talks"
                    toptabs.forEach((t) => {
                        t.classList.remove("h")
                    })
                    code.style.display = "none"
                    about.style.display = "none"
                    talks.style.display = "block"
                    tab.classList.add("h")
                    talkPosts()
                }
                window.scrollTo(0, window.innerHeight)
            }
        }
    }
}



document.onmousedown = (element) => {
    if (element.classList == "click") {
        if (element.dataset.url) {
            if (element.dataset.url == "projects") {
                history.pushState(
                    { title: "Silly projects I've done", page: "projects" },
                    "home",
                    "projects"
                )

                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "block"
                about.style.display = "none"
                talks.style.display = "none"
                toptabs[0].classList.add("h")
            } else if (element.dataset.url == "ml") {
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "block"
                about.style.display = "none"
                talks.style.display = "none"
                toptabs[0].classList.add("h")
            } else if (element.dataset.url == "cc") {
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "block"
                about.style.display = "none"
                talks.style.display = "none"
                toptabs[0].classList.add("h")
            } else if (element.dataset.url == "mltalk") {
                toptabs.forEach((t) => {
                    t.classList.remove("h")
                })
                code.style.display = "none"
                about.style.display = "none"
                talks.style.display = "block"
                toptabs[1].classList.add("h")
                talkPosts()
            }
        }
    }
}

//history working
window.onpopstate = (e) => {
    let data = e.state
    document.title = data.title
    if (data.page == "projects" || data.page == "home") {
        toptabs.forEach((t) => {
            t.classList.remove("h")
        })
        code.style.display = "block"
        about.style.display = "none"
        talks.style.display = "none"
        toptabs[0].classList.add("h")
    } else if (data.page == "about") {
        toptabs.forEach((t) => {
            t.classList.remove("h")
        })
        code.style.display = "none"
        about.style.display = "block"
        talks.style.display = "none"
        toptabs[2].classList.add("h")
    } else if (data.page == "talks") {
        toptabs.forEach((t) => {
            t.classList.remove("h")
        })
        code.style.display = "none"
        about.style.display = "none"
        talks.style.display = "block"
        toptabs[1].classList.add("h")
        talkPosts()
    }
    window.scrollTo(0, window.innerHeight)
}

//checking if it is comming fron another url
if (window.name == "projects") {
    history.pushState(
        { title: "Silly projects I've done", page: "projects" },
        "projects",
        "projects"
    )
    toptabs.forEach((t) => {
        t.classList.remove("h")
    })
    document.title = "Silly projects I've done"
    code.style.display = "block"
    about.style.display = "none"
    talks.style.display = "none"
    toptabs[0].classList.add("h")
} else if (window.name == "about") {
    history.pushState(
        { title: "Hiya! I'm Shekhar", page: "about" },
        "about",
        "about"
    )
    toptabs.forEach((t) => {
        t.classList.remove("h")
    })
    document.title = "Hiya! I'm Shekhar"
    code.style.display = "none"
    about.style.display = "block"
    talks.style.display = "none"
    toptabs[3].classList.add("h")
} else if (window.name == "talks") {
    history.pushState({ title: "Talks", page: "talks" }, "talks", "talks")
    toptabs.forEach((t) => {
        t.classList.remove("h")
    })
    document.title = "Talks"
    code.style.display = "none"
    about.style.display = "none"
    talks.style.display = "block"
    toptabs[1].classList.add("h")
    fetch("./talks.json")
        .then((d) => d.json())
        .then((data) => {
            talkdata = data
            talkPosts()
        })
}

window.name = ""
