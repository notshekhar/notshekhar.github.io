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
let root  = document.documentElement
let nightMode = false
if(localStorage.getItem('nightMode')){
	nightMode = JSON.parse(localStorage.getItem('nightMode'))
}
let data
let talkdata
let highlight = 0
let totalProjects = 0
let ml = 0,
cc = 0,
fed = 0,
bed = 0,
ld = 0;
let all_types = {
	all: "All",
	ml: "Machine Learning",
	cc: "Coding Challange",
	fed: "Front End Development",
	bed: "Back End Development",
	ld: "Logo Design"
}
//updating history
history.pushState({ title: 'slasho { codebeat }', page: 'home'}, "home", './')
code.style.display = 'block'

//fetching talks
fetch('./talks.json')
.then(d => d.json())
.then(data => {
	talkdata = data
	talkPosts()
})
//fetching notshekhar data
fetch('notshekhar.json')
.then(d => d.json())
.then(e => {
	spinner.style.display = 'none'
	document.querySelector('.bod').style.display = 'block'
	data = e 
	all(data)
	//highlighting tabs
	for (let i = 0; i < tab.length; i++) {
		if (i == highlight) {
			tab[i].classList.add('highlight')
		} else {
			tab[i].classList.remove('highlight')
		}
	}
})

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
		}else if(tabs != 'all'){
			query(tabs)
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
			tabHolder.classList.add('tab_fixed_for_mobile')
		}else{
			tabHolder.classList.remove('tab_fixed_for_mobile')
			
		}
	}
}
code.onscroll = () => {
	let y = code.scrollTop
	if(y>=tabHolder.offsetHeight){
		tabHolder.classList.add('tab_fixed')
	}else{
		tabHolder.classList.remove('tab_fixed')
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
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">'+d.year+'</span><span class="projectperyear">Done '+d.data.length+' projects this year</span></div><br><br>'
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
function ml_all() {
	ml = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == 'ml') {
				ml++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = 1
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == 'ml') {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == 'ml') {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Machine Learning #${ml}: ${l.title} - { ${l.date} }</a></div>`
				}
				ml--
			}
		})
		total.innerHTML = `Total Machine Learning Projects: ${totalProjects}`
	})
}
function cc_all(){
	cc = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == 'cc') {
				cc++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = 2
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == 'cc') {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == 'cc') {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Coding Challenges #${cc}: ${l.title} - { ${l.date} }</a></div>`
				}
				cc--
			}
		})
	})
	total.innerHTML = `Total Coding Challenges: ${totalProjects}`
}
function fed_all(){
	fed = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == 'fed') {
				fed++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = 3
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == 'fed') {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == 'fed') {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Front End Development #${fed}: ${l.title} - { ${l.date} }</a></div>`
				}
				fed--
			}
		})
	})
	total.innerHTML = `Total Front End Development Projects: ${totalProjects}`
}
function bed_all(){
	bed = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == 'bed') {
				bed++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = 4
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == 'bed') {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == 'bed') {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Back End Development #${bed}: ${l.title} - { ${l.date} }</a></div>`
				}
				bed--
			}
		})
	})
	total.innerHTML = `Total Back End Development Projects: ${totalProjects}`
}
function ld_all(){
	ld = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == 'ld') {
				ld++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = 5
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == 'ld') {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == 'ld') {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">Logo Designs #${ld}: ${l.title} - { ${l.date} }</a></div>`
				}
				ld--
			}
		})
	})
	total.innerHTML = `Total Logo Designs: ${totalProjects}`
}
function query(type){
	let keys = Object.keys(all_types)
	let type_text = all_types[type]
	let n = 0
	data.forEach(d => {
		d.data.forEach(l => {
			if (l.type == type) {
				n++
			}
		})
	})
	totalProjects = 0
	body.innerHTML = ''
	highlight = keys.indexOf(type)
	data.forEach(d => {
		let counter = 0
		d.data.forEach(l => {
			if (l.type == type) {
				counter++
			}
		})
		body.innerHTML += '<br><div class="wrap"><i></i><span class="year">' + d.year + '</span><span class="projectperyear">Done ' + counter + ' projects this year</span></div><br><br>'
		d.data.forEach(l => {
			if (l.type == type) {
				totalProjects++
				if (l.demo) {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">${type_text} #${n}: ${l.title} - { ${l.date} }</a></div><a href='${l.demo}' class="demo-url" target="_blank">&#9757; See project</a></div></li>`
				} else {
					body.innerHTML += `<li><div class="card"><div class="list"><a href='${l.url}' target="_blank">${type_text} #${n}: ${l.title} - { ${l.date} }</a></div>`
				}
				n--
			}
		})
	})
	total.innerHTML = `Total ${type_text} Projects: ${totalProjects}`
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
	tabHolder.classList.remove("tab_fixed")
	tabHolder.classList.remove("tab_fixed_for_mobile")
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


document.onmousedown = element =>{
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
	toptabs[3].classList.add('h')
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
	fetch('./talks.json')
	.then(d=>d.json())
	.then(data=>{
		talkdata = data 
		talkPosts()
	})
}
function changeMode(){
	if (nightMode) {
		root.style.setProperty('--bg-color', '#1e1e1e')
		root.style.setProperty('--bg1-color', '#252526')
		root.style.setProperty('--color', '#adadad')
		root.style.setProperty('--highlight-color', '#37373d')
		root.style.setProperty('--border-color', '#1e1e1e')
		root.style.setProperty('--header-color', '#1e1e1e')
		root.style.setProperty('--link-color', 'white')
		root.style.setProperty('--shadow', '0 1px 3px 1px rgba(0, 0, 0, 0.51),    0 1px 2px 0 rgba(60, 64, 67, 0.3)')
		document.querySelector("#nightmode").innerHTML = `<svg viewBox="0 0 26 26"><g><path d="M13 20.673c-.414 0-.75-.336-.75-.75V14.46c0-.414.336-.75.75-.75s.75.336.75.75v5.463c0 .414-.336.75-.75.75z"></path><path d="M13 4.5c-4.687 0-8.5 3.813-8.5 8.5 0 3.424 2.037 6.494 5.19 7.83.094.04.196.067.306.067.414 0 .75-.336.75-.75 0-.31-.188-.575-.456-.69C7.685 18.36 6 15.826 6 13c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.825-1.683 5.358-4.288 6.454-.273.112-.467.38-.467.693 0 .414.336.75.75.75.105 0 .204-.022.294-.06C19.455 19.51 21.5 16.433 21.5 13c0-4.687-3.813-8.5-8.5-8.5zm4 18.25c0 .414-.34.75-.757.75H9.757c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h6.486c.418 0 .757.336.757.75zm-1 2.5c0 .414-.34.75-.757.75h-4.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h4.486c.418 0 .757.336.757.75z"></path></g></svg>`
	} else {
		root.style.setProperty('--bg-color', 'white')
		root.style.setProperty('--bg1-color', 'white')
		root.style.setProperty('--color', 'rgb(20, 20, 20)')
		root.style.setProperty('--highlight-color', '#f2f2f2')
		root.style.setProperty('--border-color', 'white')
		root.style.setProperty('--header-color', '#7BE4D5')
		root.style.setProperty('--link-color', '#ff487a')
		root.style.setProperty('--shadow', '0 1px 3px 1px rgba(60, 64, 67, 0.15), 0 1px 2px 0 rgba(60, 64, 67, 0.3)')
		document.querySelector("#nightmode").innerHTML = `<svg viewBox="0 0 26 26"><g><path d="M13 20.673c-.414 0-.75-.336-.75-.75V14.46c0-.414.336-.75.75-.75s.75.336.75.75v5.463c0 .414-.336.75-.75.75z"></path><path d="M13 4.5c-4.687 0-8.5 3.813-8.5 8.5 0 3.424 2.037 6.494 5.19 7.83.094.04.196.067.306.067.414 0 .75-.336.75-.75 0-.31-.188-.575-.456-.69C7.685 18.36 6 15.826 6 13c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.825-1.683 5.358-4.288 6.454-.273.112-.467.38-.467.693 0 .414.336.75.75.75.105 0 .204-.022.294-.06C19.455 19.51 21.5 16.433 21.5 13c0-4.687-3.813-8.5-8.5-8.5zM13 3c-.414 0-.75-.34-.75-.757V.757C12.25.34 12.586 0 13 0s.75.34.75.757v1.486c0 .418-.336.757-.75.757zM3 13c0 .414-.34.75-.757.75H.757C.34 13.75 0 13.414 0 13s.34-.75.757-.75h1.486c.418 0 .757.336.757.75zm23 0c0 .414-.34.75-.757.75h-1.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h1.486c.418 0 .757.336.757.75zM5.93 5.93c-.294.292-.77.29-1.067-.006l-1.05-1.05c-.296-.296-.298-.774-.005-1.066s.77-.29 1.066.005l1.05 1.05c.295.296.298.773.005 1.066zm16.262-2.122c.293.293.29.77-.005 1.066l-1.05 1.05c-.296.296-.774.3-1.067.006s-.29-.77.005-1.066l1.05-1.05c.297-.297.775-.3 1.067-.006zM17 22.75c0 .414-.34.75-.757.75H9.757c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h6.486c.418 0 .757.336.757.75zm-1 2.5c0 .414-.34.75-.757.75h-4.486c-.418 0-.757-.336-.757-.75s.34-.75.757-.75h4.486c.418 0 .757.336.757.75z"></path></g></svg>`
	}
}
changeMode()

document.querySelector("#nightmode").onclick = () => {
	nightMode = !nightMode
	localStorage.setItem("nightMode", nightMode)
	changeMode()
}
//for donation 
// let donate = document.querySelector("#donate")
// donate.onclick = () => {
// 	let money = prompt("Enter the Donation Amount USD")
// 	const request = new PaymentRequest([{
// 		supportedMethods: 'basic-card'
// 	}], {
// 		total: {
// 			label: 'Donate',
// 			amount: {
// 				value: money,
// 				currency: 'USD'
// 			}
// 		}
// 	});
// 	request.show().then(response=>{
// 		response.complete()
// 		console.log(response)
// 	})

// }

window.name = ''