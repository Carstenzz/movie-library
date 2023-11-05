let page = 1
let currentWord
let ready = true

const slide = document.querySelectorAll(".slide")
const gtw = document.querySelector('.gtwDahCape')

const search = document.querySelector("#search")
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        search.blur();
        input(search.value)
    }
});
const bigSearch = document.querySelector("#bigSearch")
bigSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        bigSearch.blur();
        input(bigSearch.value)
    }
});

function sync(){
    bigSearch.value = currentWord
    search.value = currentWord
}
  
function input(title){
    // console.log(ready)
    if(ready){
        ready = !ready

        slide.forEach((e,i)=>{
            setTimeout(()=>{
                e.classList.add('left')
            }, 200*i)
        })
        document.querySelector(".cover").style.opacity = 0;
        
        gtw.style.opacity = 0;
        

        let active = document.querySelectorAll('.show')
        active.forEach((e,i)=>{
            setTimeout(()=>{
                e.classList.remove('show')
            },100*i)
        })

        currentWord = title
        
        axios.get(`www.omdbapi.com/?apikey=d684a20e&s=${title}&page=${page}`)
        .then(response => {

            let movies = response.data.Search
            let cards = ''
            
            setTimeout(()=>{
                document.querySelector('#main').innerHTML = ''
            },1500)

            movies.forEach((data,i) => {
                let div = document.createElement('div')
                div.classList.add('card')
                div.innerHTML= showdata(data)
                
                setTimeout(()=>{
                    document.querySelector('#main').append(div)
                },2000)
                setTimeout(()=>{
                    div.classList.add('show')
                },100*i + 2000)        
            })


            setTimeout(()=>{
                document.querySelector(".page").innerHTML = `
                <span class="material-symbols-outlined button" onclick="page--; input(currentWord)">chevron_left</span>
                <span>Page ${page}</span>
                <span class="material-symbols-outlined button" onclick="page++; input(currentWord)">chevron_right</span>`
                // console.log('a')
                ready = !ready
            },2500)
            
        })
        .catch(function (error) {
            // console.log(error)
            setTimeout(()=>{
                document.querySelector("#main").innerHTML = `
                <h3 style="align-self: center;">Search result is too many or search not found</h3>`
                document.querySelector(".page").innerHTML = ''
                ready = !ready
            },2000)
        })
    }
}

function showdata(data){
    
    return `
    <img src="${data.Poster}" class="image">
    <div class="info">
        <h3 class="title">${data.Title}</h3>
        <div class="desc">
            <p class="type">${data.Type}</p>
            <p class="divider">|</p>
            <p class="year">${data.Year}</p>
        </div>
    </div>`
}

