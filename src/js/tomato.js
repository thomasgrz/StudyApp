let add_tomato = new CustomEvent("add_tomato")
document.addEventListener("add_tomato",()=>{
    debugger
    console.log("tomato added")
    let container = document.getElementById("tomatoes")
    let tomato = document.createElement("img")
    tomato.src = "img/tomato.svg"
    container.appendChild(tomato)
})


console.log("im connected")