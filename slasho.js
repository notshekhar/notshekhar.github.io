let code = document.querySelector("#code")
let body = document.querySelector("#projects")
let profile = document.querySelector('#profile')
let tabHolder = document.querySelector('.tabs')
let tab = document.querySelectorAll('.tab')
let spinner = document.querySelector('.spinner')
let spacer = document.querySelector('.spacer')
let total = document.querySelector('#total')
let toptabs = document.querySelectorAll('.toptab')
let about = document.querySelector('.about')
let talks = document.querySelector('.talks')
let talkbody = document.querySelector('.talkbody')
let data;
let talkdata
let highlight = 0
let totalProjects = 0
let ml = 0,
    cc = 0,
    fed = 0,
    bed = 0,
    ld = 0;
//updating history
history.pushState({ title: 'slasho { codebeat }', page: 'home'}, "home", './')


code.style.display = 'block'
let re = new XMLHttpRequest()
re.open('GET', 'talks.json')
re.onloadend= () => {
  talkdata = JSON.parse(re.responseText)
}
re.send()
let r = new XMLHttpRequest()
r.open("GET", "slasho.json")
r.onloadend = () =>{
  spinner.style.display = 'none'
  document.querySelector('body').style.display = 'block'
  data = r.responseText
  data = JSON.parse(data)
  //
  all(data)
  //highlighting tabs
  for(let i=0; i<tab.length; i++){
    if(i == highlight){
      tab[i].classList.add('highlight')
    }else{
      tab[i].classList.remove('highlight')
    }
  }

}
r.send()

window.onkeyup = e =>{
  if(e.key == "ArrowUp"){
    code.scrollTop = code.scrollTop-30
  }else if(e.key == "ArrowDown"){
    code.scrollTop  = code.scrollTop+30
  }
}

document.onclick = e => {
  if(e.srcElement.dataset.type){
    //getting tabs dataset type
    let tabs = e.srcElement.dataset.type
    if(window.innerWidth>700){
      code.scrollTo(0,0)
    }
    if(tabs == 'all'){
      totalProjects = 0
      body.innerHTML = ''
      highlight = 0
      all(data)
    }else if(tabs == 'ml'){
      //getting number of ml and cc and fed and bed and ld projects
      ml=0
      data.forEach(d => {
        d.data.forEach(l => {
          if(l.type == 'ml'){
            ml++
          }
        })
      })
      totalProjects = 0
      body.innerHTML = ''
      highlight = 1
      data.forEach(d=>{
        body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
        d.data.forEach(l =>{
          if(l.type == 'ml'){
            totalProjects++
            if(l.demo){
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
            }else{
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div>`
            }
            ml--
          }
        })
        total.innerHTML = `Total Machine Learning Projects: ${totalProjects}`
      })
    }else if(tabs == 'cc'){
      cc = 0
      data.forEach(d => {
        d.data.forEach(l => {
          if(l.type == 'cc'){
            cc++
          }
        })
      })
      totalProjects = 0
      body.innerHTML = ''
      highlight = 2
      data.forEach(d=>{
        body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
        d.data.forEach(l =>{
          if(l.type == 'cc'){
            totalProjects++
            if(l.demo){
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
            }else{
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div>`
            }
            cc--
          }
        })
      })
      total.innerHTML = `Total Coding Challenges: ${totalProjects}`
    }else if(tabs == 'fed'){
      fed=0
      data.forEach(d => {
        d.data.forEach(l => {
          if(l.type == 'fed'){
            fed++
          }
        })
      })
      totalProjects = 0
      body.innerHTML = ''
      highlight = 3
      data.forEach(d=>{
        body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
        d.data.forEach(l =>{
          if(l.type == 'fed'){
            totalProjects++
            if(l.demo){
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
            }else{
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div>`
            }
            fed--
          }
        })
      })
      total.innerHTML = `Total Front End Development Projects: ${totalProjects}`
    }else if(tabs == 'bed'){
      bed=0
      data.forEach(d => {
        d.data.forEach(l => {
          if(l.type == 'bed'){
            bed++
          }
        })
      })
      totalProjects = 0
      body.innerHTML = ''
      highlight = 4
      data.forEach(d=>{
        body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
        d.data.forEach(l =>{
          if(l.type == 'bed'){
            totalProjects++
            if(l.demo){
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
            }else{
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div>`
            }
            bed--
          }
        })
      })
      total.innerHTML = `Total Back End Development Projects: ${totalProjects}`
    }else if(tabs == 'ld'){
      ld=0
      data.forEach(d => {
        d.data.forEach(l => {
          if(l.type == 'ld'){
            ld++
          }
        })
      })
      totalProjects = 0
      body.innerHTML = ''
      highlight = 5
      data.forEach(d=>{
        body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
        d.data.forEach(l =>{
          if(l.type == 'ld'){
            totalProjects++
            if(l.demo){
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
            }else{
              body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div>`
            }
            ld--
          }
        })
      })
      total.innerHTML = `Total Logo Designs: ${totalProjects}`
    }
    //highlighting tabs
    for(let i=0; i<tab.length; i++){
      if(i == highlight){
        tab[i].classList.add('highlight')
      }else{
        tab[i].classList.remove('highlight')
      }
    }

  }
}

//making tabs skicky for mobile
window.onscroll = () => {
  let y = window.scrollY
  if(window.innerWidth<700){
    if(y>=15+window.innerHeight+tabHolder.offsetHeight){
      tabHolder.style.position = 'fixed'
      tabHolder.style.top = '0px'
      tabHolder.style.left = '0px'
      tabHolder.style.marginTop = '8px'
      tabHolder.style.boxShadow = 'rgba(60, 64, 67, 0.15) 5px 0px 3px 1px, rgba(60, 64, 67, 0.3) 4px -1px 2px 0px'
      spacer.style.height = `${38+tabHolder.getBoundingClientRect().height}px`
    }else{
      tabHolder.style.position = 'relative'
      tabHolder.style.top = 'auto'
      tabHolder.style.left = 'auto'
      tabHolder.style.marginTop = '30px'
      tabHolder.style.boxShadow = 'none'
      spacer.style.height = '0px'
    }
  }
}
code.onscroll = () => {
  let y = code.scrollTop
  if(y>=tabHolder.offsetHeight){
    tabHolder.style.position = 'fixed'
    tabHolder.style.top = '0px'
    tabHolder.style.left = `${profile.getBoundingClientRect().width}px`
    tabHolder.style.marginTop = '8px'
    tabHolder.style.boxShadow = 'rgba(60, 64, 67, 0.15) 5px 0px 3px 1px, rgba(60, 64, 67, 0.3) 4px -1px 2px 0px'
    tabHolder.style.width = `${code.getBoundingClientRect().width}px`
    spacer.style.height = `${20+tabHolder.getBoundingClientRect().height}px`
  }else{
    tabHolder.style.position = 'relative'
    tabHolder.style.top = 'auto'
    tabHolder.style.left = 'auto'
    tabHolder.style.marginTop = '30px'
    tabHolder.style.boxShadow = 'none'
    tabHolder.style.width = '100%'
    spacer.style.height = '0px'
  }
}


//all data
function all(data){
  //getting number of ml and cc and fed and bed and ld projects
  ml=0, cc=0, fed=0, bed=0, ld=0
  data.forEach(d => {
    d.data.forEach(l => {
      if(l.type == 'ml'){
        ml++
      }else if(l.type == 'cc'){
        cc++
      }else if(l.type == 'fed'){
        fed++
      }else if(l.type == 'bed'){
        bed++
      }else if(l.type == 'ld'){
        ld++
      }
    })
  })
  // console.log(ml, cc, fed, bed, ld)

  data.forEach(d=>{
    body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span></div><br><br>'
    d.data.forEach(l =>{
      totalProjects++
      //Pasting projects in body
      if(l.type == 'ml'){
        if(l.demo){
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
        }else{
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div>`
        }
        ml--
      }else if(l.type == 'cc'){
        if(l.demo){
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
        }else{
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div>`
        }
        cc--
      }else if(l.type == 'fed'){
        if(l.demo){
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
        }else{
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div>`
        }
        fed--
      }else if(l.type == 'bed'){
        if(l.demo){
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
        }else{
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div>`
        }
        bed--
      }else if(l.type == 'ld'){
        if(l.demo){
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
        }else{
          body.innerHTML +=`<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div>`
        }
        ld--
      }

    })
    total.innerHTML = `Total Projects: ${totalProjects}`
  })

}


//switching b/w tabs
for(let i=0; i<toptabs.length; i++){
  let tab = toptabs[i]
  tab.onclick = () =>{
    if(tab.dataset.url == 'projects'){
      history.pushState({ title: "Silly projects I've done", page: 'projects'}, "home", 'projects')
      document.title = "Silly projects I've done"
      toptabs.forEach(t=>{
        t.classList.remove('h')
      })
      code.style.display = 'block'
      about.style.display = 'none'
      talks.style.display = 'none'
      tab.classList.add('h')
    }else if(tab.dataset.url == 'about'){
      history.pushState({ title: "Hiya! I'm Shekhar", page: 'about'}, "about", 'about')
      document.title = "Hiya! I'm Shekhar"
      toptabs.forEach(t=>{
        t.classList.remove('h')
      })
      code.style.display = 'none'
      about.style.display = 'block'
      talks.style.display = 'none'
      tab.classList.add('h')
    }else if(tab.dataset.url == 'talks'){
      history.pushState({ title: "Talks", page: 'talks'}, "talks", 'talks')
      document.title = "Talks"
      toptabs.forEach(t=>{
        t.classList.remove('h')
      })
      code.style.display = 'none'
      about.style.display = 'none'
      talks.style.display = 'block'
      tab.classList.add('h')
      talkPosts()
    }
  }
}
//if user is operating in mobile
if(window.innerWidth<700){
  //switching b/w tabs
  for(let i=0; i<toptabs.length; i++){
    let tab = toptabs[i]
    tab.onclick = () =>{
      if(tab.dataset.url == 'projects'){
        history.pushState({ title: "Silly projects I've done", page: 'projects'}, "home", 'projects')
        document.title = "Silly projects I've done"
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'block'
        about.style.display = 'none'
        talks.style.display = 'none'
        tab.classList.add('h')
      }else if(tab.dataset.url == 'about'){
        history.pushState({ title: "Hiya! I'm Shekhar", page: 'about'}, "about", 'about')
        document.title = "Hiya! I'm Shekhar"
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'none'
        about.style.display = 'block'
        talks.style.display = 'none'
        tab.classList.add('h')
      }else if(tab.dataset.url == 'talks'){
        history.pushState({ title: "Talks", page: 'talks'}, "talks", 'talks')
        document.title = "Talks"
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'none'
        about.style.display = 'none'
        talks.style.display = 'block'
        tab.classList.add('h')
        talkPosts()
      }
      window.scrollTo(0, window.innerHeight)
    }
  }
}
window.onresize = () =>{
  //if user is operating in mobile
  if(window.innerWidth<700){
    //switching b/w tabs
    for(let i=0; i<toptabs.length; i++){
      let tab = toptabs[i]
      tab.onclick = () =>{
        if(tab.dataset.url == 'projects'){
          history.pushState({ title: "Silly projects I've done", page: 'projects'}, "home", 'projects')
          document.title = "Silly projects I've done"
          toptabs.forEach(t=>{
            t.classList.remove('h')
          })
          code.style.display = 'block'
          about.style.display = 'none'
          talks.style.display = 'none'
          tab.classList.add('h')
        }else if(tab.dataset.url == 'about'){
          history.pushState({ title: "Hiya! I'm Shekhar", page: 'about'}, "about", 'about')
          document.title = "Hiya! I'm Shekhar"
          toptabs.forEach(t=>{
            t.classList.remove('h')
          })
          code.style.display = 'none'
          about.style.display = 'block'
          talks.style.display = 'none'
          tab.classList.add('h')
        }else if(tab.dataset.url == 'talks'){
          history.pushState({ title: "Talks", page: 'talks'}, "talks", 'talks')
          document.title = "Talks"
          toptabs.forEach(t=>{
            t.classList.remove('h')
          })
          code.style.display = 'none'
          about.style.display = 'none'
          talks.style.display = 'block'
          tab.classList.add('h')
          talkPosts()
        }
        window.scrollTo(0, window.innerHeight)
      }
    }
  }
}

//posting talks
function talkPosts(){
  talkdata.forEach(data=>{
    talkbody.innerHTML = ''
    talkbody.innerHTML += `<br><div class="wrap"><i></i><span class="year">${data.year}</span></div><br><br>`
    data.data.forEach(d => {
      if(d.type == 'article'){
        talkbody.innerHTML +=`<li><div class="card"><div class="list">${d.title}-{ ${d.date} }</div><a target="blank" href="${d.url}" class='show'>&#9757; Read</a></div></li>`
      }else{
        talkbody.innerHTML +=`<li><div class="card"><div class="list">${d.title}-{ ${d.date} }</div><a target="blank" href="${d.url}" class='show'>&#9757; Video</a></div></li>`
      }
    })
  })
}


document.onmousedown = e =>{
  if(element.classList == 'click'){
    if(element.dataset.url){
      if(element.dataset.url == 'projects'){
        history.pushState({ title: "Silly projects I've done", page: 'projects'}, "home", 'projects')

        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'block'
        about.style.display = 'none'
        talks.style.display = 'none'
        toptabs[0].classList.add('h')
      }else if(element.dataset.url == 'ml'){
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'block'
        about.style.display = 'none'
        talks.style.display = 'none'
        toptabs[0].classList.add('h')
      }else if(element.dataset.url == 'cc'){
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'block'
        about.style.display = 'none'
        talks.style.display = 'none'
        toptabs[0].classList.add('h')
      }else if(element.dataset.url == 'mltalk'){
        toptabs.forEach(t=>{
          t.classList.remove('h')
        })
        code.style.display = 'none'
        about.style.display = 'none'
        talks.style.display = 'block'
        toptabs[1].classList.add('h')
        talkPosts()
      }
    }
  }

}





//history working
window.onpopstate = e => {
  let data = e.state
  document.title = data.title
  if(data.page == 'projects' || data.page == 'home'){
    toptabs.forEach(t=>{
      t.classList.remove('h')
    })
    code.style.display = 'block'
    about.style.display = 'none'
    talks.style.display = 'none'
    toptabs[0].classList.add('h')
  }else if(data.page == 'about'){
    toptabs.forEach(t=>{
      t.classList.remove('h')
    })
    code.style.display = 'none'
    about.style.display = 'block'
    talks.style.display = 'none'
    toptabs[2].classList.add('h')
  }else if(data.page == 'talks'){
    toptabs.forEach(t=>{
      t.classList.remove('h')
    })
    code.style.display = 'none'
    about.style.display = 'none'
    talks.style.display = 'block'
    toptabs[1].classList.add('h')
    talkPosts()
  }
  window.scrollTo(0, window.innerHeight)
}



//checking if it is comming fron another url
if(window.name == 'projects'){
  history.pushState({ title: "Silly projects I've done", page: 'projects'}, "projects", 'projects')
  toptabs.forEach(t=>{
    t.classList.remove('h')
  })
  document.title = "Silly projects I've done"
  code.style.display = 'block'
  about.style.display = 'none'
  talks.style.display = 'none'
  toptabs[0].classList.add('h')
}else if(window.name == 'about'){
  history.pushState({ title: "Hiya! I'm Shekhar", page: 'about'}, "about", 'about')
  toptabs.forEach(t=>{
    t.classList.remove('h')
  })
  document.title = "Hiya! I'm Shekhar"
  code.style.display = 'none'
  about.style.display = 'block'
  talks.style.display = 'none'
  toptabs[2].classList.add('h')
}else if(window.name == 'talks'){
  history.pushState({ title: 'Talks', page: 'talks'}, "talks", 'talks')
  toptabs.forEach(t=>{
    t.classList.remove('h')
  })
  document.title = "Talks"
  code.style.display = 'none'
  about.style.display = 'none'
  talks.style.display = 'block'
  toptabs[1].classList.add('h')
  let rq = new XMLHttpRequest()
  rq.open('GET', './talks.json')
  rq.onloadend= () => {
    talkdata = JSON.parse(re.responseText)
    talkPosts()
  }
  rq.send()
}

window.name = ''
