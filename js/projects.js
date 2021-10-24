//fetching talks

; (async function init() {
    let res1 = await fetch("./js/talks.json")
    let res2 = await fetch("./js/notshekhar.json")
    await fetch("../assets/loading.svg")
    await fetch("../assets/loading.svg")
    await fetch("../assets/Lob.ttf")
    await fetch("../assets/notshekhar.ttf")
    talkdata = await res1.json()
    data = await res2.json()
    spinner.style.display = "none"
    document.querySelector(".bod").style.display = "block"
    all(data)
    setObserver()

    //highlighting tabs
    for (let i = 0; i < tab.length; i++) {
        if (i == highlight) {
            tab[i].classList.add("highlight")
        } else {
            tab[i].classList.remove("highlight")
        }
    }
})()

//for creating new element
function createElement(e, attrs) {
    let el = document.createElement(e)
    for (let attr in attrs) {
        const value = attrs[attr]
        if (attr == "innerText") el.innerText = value
        else if (attr == "innerHTML") el.innerHTML = value
        else if (attr == "styles") {
            let styles = attrs[attr]
            for (let style in styles) {
                el.style[style] = styles[style]
            }
        } else el.setAttribute(attr, value)
    }
    return el
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this)
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i])
        }
    }
}
//list
function printlist(l, count) {
    let br = createElement("br")
    let br1 = createElement("br")
    let br2 = createElement("br")
    let br3 = createElement("br")
    let li = createElement("li")
    let card = createElement("div", {
        class: "card",
    })
    let card_body = createElement("div", {
        class: "card_body",
    })
    let list = createElement("div", {
        class: "list",
    })
    let title = createElement("a", {
        target: "_blank",
        href: l.url,
        class: "card_body_title",
        innerHTML: `${all_types[l.type].logo}&nbsp;&nbsp;${all_types[l.type].name
            } #${count}: ${l.title}`,
    })
    // let title_text = createElement("span", {
    //     innerText: `${all_types[l.type].name} #${count}: ${l.title}`,
    // })
    let techs_users = createElement("div", {
        class: "techs_body",
    })
    if (l.technologies) {
        techs_users.append(
            createElement("span", {
                innerHTML: "With : ",
                class: "tech_used_title",
            })
        )
        l.technologies.forEach((tech) => {
            techs_users.append(
                createElement("span", {
                    class: "techs_used",
                    innerHTML: tech + " ",
                })
            )
        })
    } else {
        techs_users = ""
    }
    let demo = createElement("a")
    if (l.demo) {
        demo = createElement("a", {
            target: "_blank",
            href: l.demo,
            class: "demo",
            innerHTML: `${demoIcon}See Demo`,
        })
    } else {
        demo = ""
    }
    let datetime = createElement("div", {
        class: "timedate",
        innerText: l.date,
    })
    list.append(title)
    card_body.append(list, demo, techs_users)
    card.append(card_body, datetime)
    li.append(card)
    body.append(li)
}

function printYear(y, n) {
    let br1 = createElement("br")
    let br2 = createElement("br")
    let br3 = createElement("br")
    let wrap = createElement("div", {
        class: "wrap",
    })
    let i = createElement("i")
    let year = createElement("span", {
        class: "year",
        innerText: y,
    })
    let projects_done_in_this_year = createElement("span", {
        class: "projectperyear",
        innerText: `Done ${n} projects this year`,
    })
    wrap.append(i, year, projects_done_in_this_year)
    body.append(br1, wrap, br2, br3)
}

//all data
function all(data) {
    //getting number of ml and cc and fed and bed and ld projects
    ; (ml = 0), (cc = 0), (fed = 0), (bed = 0), (ld = 0)
    data.forEach((d) => {
        d.data.forEach((l) => {
            if (l.type == "ml") {
                ml++
            } else if (l.type == "cc") {
                cc++
            } else if (l.type == "fed") {
                fed++
            } else if (l.type == "bed") {
                bed++
            } else if (l.type == "ld") {
                ld++
            }
        })
    })
    // console.log(ml, cc, fed, bed, ld)

    data.forEach((d) => {
        if (d.data.length > 0) printYear(d.year, d.data.length)
        d.data.forEach((l) => {
            totalProjects++
            //Pasting projects in body
            if (l.type == "ml") {
                printlist(l, ml)
                ml--
            } else if (l.type == "cc") {
                printlist(l, cc)
                cc--
            } else if (l.type == "fed") {
                printlist(l, fed)
                fed--
            } else if (l.type == "bed") {
                printlist(l, bed)
                bed--
            } else if (l.type == "ld") {
                printlist(l, ld)
                ld--
            }
        })
        total.innerHTML = `Total Projects: ${totalProjects}`
    })
}

function query(type) {
    let keys = Object.keys(all_types)
    let type_text = all_types[type].name
    let n = 0
    data.forEach((d) => {
        d.data.forEach((l) => {
            if (l.type == type) {
                n++
            }
        })
    })
    totalProjects = 0
    body.innerHTML = ""
    highlight = keys.indexOf(type)
    data.forEach((d) => {
        let counter = 0
        d.data.forEach((l) => {
            if (l.type == type) {
                counter++
            }
        })
        //printing year with no of projects
        if (counter > 0) printYear(d.year, counter)
        //printing projects in that year
        d.data.forEach((l) => {
            if (l.type == type) {
                totalProjects++
                printlist(l, n)
                n--
            }
        })
    })
    total.innerHTML = `Total ${type_text} Projects: ${totalProjects}`
}
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
    }
}

//posting talks
function talkPosts() {
    talkdata.forEach((data) => {
        talkbody.innerHTML = ""
        talkbody.innerHTML += `<br><div class="wrap"><i></i><span class="year">${data.year}</span></div><br><br>`
        data.data.forEach((d) => {
            if (d.type == "article") {
                talkbody.innerHTML += `<li><div class="card"><div class="list">${d.title}-{ ${d.date} }</div><a target="blank" href="${d.url}" class='show'>&#9757; Read</a></div></li>`
            } else {
                talkbody.innerHTML += `<li><div class="card"><div class="list">${d.title}-{ ${d.date} }</div><a target="blank" href="${d.url}" class='show'>&#9757; Video</a></div></li>`
            }
        })
    })
}

//intersection observer
async function setObserver() {
    let elements = document.querySelectorAll(".card")
    console.log(elements)
    const options = {
        // threshold: 1,
    }
    const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("show")
            entry.target.classList.add("animate__animated")
            entry.target.classList.add("animate__bounceIn")
            appearOnScroll.unobserve(entry.target)
        })
    },
        options)
    elements.forEach((el) => {
        appearOnScroll.observe(el)
    })
}
