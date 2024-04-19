let gameContainer = document.getElementById("game");
let menuContainer = document.getElementById("menu")
//declaring storage variables
let moveCount = 0
let cellsX = []
let cellsY = []

function checkWinCondition(id, cellsArray, player){
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
        }
    });

    return cellsArray
}

function cellAction(button, moveCount, cellsX, cellsY){
    // function 
    if(moveCount % 2 != 0){
        button.innerHTML = "X"
        cellsX = checkWinCondition(button.id, cellsX, "X")
        moveCount++
    }
    else{
        button.innerHTML = "O"
        cellsY = checkWinCondition(button.id, cellsY, "O")
        moveCount++
    }
    button.disabled = true
    console.log(moveCount)

    
    return [moveCount,cellsX,cellsY]   
}

function beginAction(buttons){
    moveCount = 0
    cellsX = []
    cellsY = []
    buttons.forEach(button => {
        button.disabled = false;
        button.innerHTML = ''
    });
}

// Creating grid 3x3
let buttons = []
for(let i = 1; i <= 9; i++){
    let gameNameLetters = ["t", "i", "k", "t", "a", "k", "t", "o", "e"]
    let button = document.createElement("button")
    button.innerHTML = gameNameLetters[i-1].toUpperCase();
    button.id = i
    button.addEventListener('click', function() { 
        [moveCount,cellsX,cellsY] = cellAction(button, moveCount, cellsX, cellsY)
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



let beginButton = document.createElement("button")
beginButton.innerHTML = "Begin game";

beginButton.addEventListener("click", () => { beginAction(buttons) })

menuContainer.appendChild(beginButton)

