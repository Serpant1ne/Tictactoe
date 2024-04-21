let gameContainer = document.getElementById("game");
let menuContainer = document.getElementById("menu")
let moveText = document.getElementById("move")
//declaring storage variables
let moveCount = 0
let cellsX = []
let cellsY = []
let scoreArray = [0,0]
let scoreboard = []


function endGame(buttons, scoreArray, scoreboard){
    buttons.forEach(button => {
        button.disabled = true
    })
    scoreboard[0].innerHTML = scoreArray[0]
    scoreboard[1].innerHTML = scoreArray[1]


}

function checkWinCondition(id, cellsArray, player, buttons, scoreArray, scoreboard){
    cellsArray.push(parseInt(id))
    cellsArray.sort()
    console.log(player + ":")
    let winningCombinations = [
        [1, 2, 3], // First row
        [4, 5, 6], // Second row
        [7, 8, 9], // Third row
        [1, 4, 7], // First column
        [2, 5, 8], // Second column
        [3, 6, 9], // Third column
        [1, 5, 9], // Diagonal left to right
        [3, 5, 7], // Diagonal right to left
      ];

      winningCombinations.forEach(combination => {
        if (combination.every(elem => cellsArray.includes(elem))) {
            console.log("Player " + player + " won!");
            if(player == "X"){
                scoreArray[0]++
            }
            else{
                scoreArray[1]++
            }
            
            endGame(buttons, scoreArray, scoreboard)
            
        }
    });
    console.log([cellsArray, scoreArray])
    return [cellsArray, scoreArray]
}

function cellAction(button, moveCount, cellsX, cellsY, buttons, scoreboard, moveText){
    // function
    moveCount++
    if(moveCount == 9){
        console.log("Draw")
    }
    if(moveCount % 2 != 0){
        button.innerHTML = "X"
        let checkReturn = checkWinCondition(button.id, cellsX, "X", buttons, scoreArray, scoreboard)
        cellsX = checkReturn[0]
        scoreArray = checkReturn[1]
        moveText.innerHTML = "O"
    }
    else{
        button.innerHTML = "O"
        let checkReturn = checkWinCondition(button.id, cellsY, "O", buttons, scoreArray, scoreboard)
        cellsY = checkReturn[0]
        scoreArray = checkReturn[1]
        moveText.innerHTML = "X"
    }
    button.disabled = true
    console.log(moveCount)

    
    return [moveCount,cellsX,cellsY, scoreArray, moveText]   
}

function beginAction(buttons, beginButton, moveText){
    moveCount = 0
    cellsX = []
    cellsY = []
    moveText.innerHTML = "X"
    buttons.forEach(button => {
        button.disabled = false;
        button.innerHTML = ''
    });
    beginButton.innerHTML = "Restart"
}

// Creating grid 3x3
let buttons = []
for(let i = 1; i <= 9; i++){
    let gameNameLetters = ["t", "i", "k", "t", "a", "k", "t", "o", "e"]
    let button = document.createElement("button")
    button.innerHTML = gameNameLetters[i-1].toUpperCase();
    button.id = i
    button.addEventListener('click', function() { 
        [moveCount,cellsX,cellsY, scoreArray] = cellAction(button, moveCount, cellsX, cellsY, buttons, scoreboard, moveText)
    })

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

//Creating scoreArray

let XScore = document.getElementById("XScore")
let OScore = document.getElementById("OScore")
scoreboard = [XScore, OScore]

XScore.innerHTML = scoreArray[0]
OScore.innerHTML = scoreArray[1]




let beginButton = document.createElement("button")
beginButton.innerHTML = "Begin game";

beginButton.addEventListener("click", () => { beginAction(buttons, beginButton, moveText) })

menuContainer.appendChild(beginButton)

