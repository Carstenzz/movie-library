let page = 1
let currentWord
let ready = true
let errormsg

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
        
        axios.get(`https://www.omdbapi.com/?apikey=df662044&s=${title}&page=${page}`)
        .then(response => {
            console.log(response.data)

            if(!response.data.response){
                errormsg = response.data.Error
            }

            let movies = response.data.Search
            let cards = ''
            
            setTimeout(()=>{
                document.querySelector('.container').innerHTML = ''
            },1500)

            movies.forEach((data,i) => {
                let div = document.createElement('div')
                div.classList.add('card')
                div.innerHTML= showdata(data)
                
                setTimeout(()=>{
                    document.querySelector('.container').append(div)
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
            let h3 = document.createElement('h3')
            h3.innerHTML = errormsg
            h3.style.alignSelf = "center"
            h3.style.transition = '1s'
            h3.style.opacity = 0
            
            setTimeout(()=>{
                document.querySelector(".container").append(h3)
                setTimeout(()=>{h3.classList.add('show')}, 1)
                
                // document.querySelector(".container").innerHTML = `
                // <h3 style="align-self: center;">Search result is too many or search not found</h3>`
                document.querySelector(".page").innerHTML = ''
                ready = !ready
            },2000)
        })
    }
}

function showdata(data){
    
    return `
    <img src="${data.Poster}" class="image" alt="movie image">
    <div class="info">
        <h3 class="title">${data.Title}</h3>
        <div class="desc">
            <p class="type">${data.Type}</p>
            <p class="divider">|</p>
            <p class="year">${data.Year}</p>
        </div>
    </div>`
}

