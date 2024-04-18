let gameContainer = document.getElementById("game");
let menuContainer = document.getElementById("menu")

function logging(i){
    // test command. Used in buttons
    console.log(i)
}

function beginAction(){
    console.log("begonnen")
}

// Creating grid 3x3
let buttons = []
for(let i = 1; i <= 9; i++){
    let gameNameLetters = ["t", "i", "k", "t", "a", "k", "t", "o", "e"]
    let button = document.createElement("button")
    button.innerHTML = gameNameLetters[i-1].toUpperCase();
    button.addEventListener('click', function() { logging(i); })

    //styling
    if(i <= 3){
        button.style.borderTop = "none"
    }
    if(i % 3 == 0){
        button.style.borderRight = "none"
    }
    if((i-1) % 3 == 0){
        button.style.borderLeft = "none"
    }
    if(i >= 7){
        button.style.borderBottom = "none"
    }
    button.disabled = true

    buttons.push(button)
    gameContainer.appendChild(button)
}



let beginButton = document.createElement("button")
beginButton.innerHTML = "Begin game";

beginButton.addEventListener("click", () => { beginAction() })

menuContainer.appendChild(beginButton)

