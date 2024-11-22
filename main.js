const body = document.querySelector("body");
const para = document.querySelector("p");

// para.textContent = "Welcome testing testing text content via js";

// body.appendChild(para);


function Gameboard() { 
    let grid = []; 

    // will change to const for actual games. for testing purposes. 
    rows = 3;
    columns = 3;

    const createGrid = function() { 

        // grid = [
        //     ["O","X","X"],
        //     [0, "X", 0],
        //     ["O",0,"O"],
        // ];

        for (i=0; i < rows; i++) { 

        grid[i] = [];
    
            for (let j=0; j < columns; j++) { 
                grid[i][j] = 0;
              
            }
        }


        return grid;
    } 

   

    const getGrid = () => grid;



    // use a nested loop to create 2d array, which will be the board game is played on. 1st array is row and 1st element in each array is 1st column. 

    const logBoard = () => { 
       const printedBoard = console.log(grid);

       return printedBoard;
    }

    const placeMarker = function(xCoord, yCoord) {
        // checks if cell is free. 
        // if it is places "X", if it isn't >
        // asks for a different cell. 
        if (grid[xCoord][yCoord] !== 0) { 
            console.log("That spot's taken, pick a different cell to make a move.");
           return false;
        
        }
        else { 
            grid[xCoord][yCoord] = gameplay.getActivePlayer().marker;
            return true;

        }
      
        
    }




    return {createGrid, getGrid, logBoard, placeMarker};

}

const theGrid = Gameboard();

theGrid.createGrid();





function GameController() { 


    let playerOneName = "Player ONE (X)";
    let playerTwoName = "Player TWO (O)";
 
   let players = [
    {   
        name: playerOneName,
        marker: "X",
    },
    {
        name: playerTwoName,
        marker: "O",
    }
   ]

  


let activePlayer = players[0];

const switchPlayerTurn = () => { 
    activePlayer = activePlayer === players[0] ? players[1] : players[0] 
    console.log("turn switched");
};

const getActivePlayer = () => activePlayer;

const printNewRound = () => { 
    theGrid.logBoard();
    
     return console.log( 
        `${getActivePlayer().name}'s turn. Make a move`
    );
};

const checkRow = () => {

    let winningRows = ["XXX","OOO"];
    const flattenedArray = theGrid.getGrid().map((subArray) => subArray.join(""));


const hasWinningRow = (row) => winningRows.includes(row);

//callback function to use for some. takes in each element (row) in flattenedArray and returns true if this is matches a winning row,
  // either XXX or OOO. 

let rowResult = flattenedArray.some(hasWinningRow);

return rowResult;
// using some to check if 1 of the flatened rows (elements) has a winning sequence, 3 Xs or 3 Os.
}


const checkColumn = () => { 

    let winningColumns = ["XXX","OOO"];
    let flattenedColumns = [];

    for (i=0; i < theGrid.getGrid().length; i++ ) { 
        let column = theGrid.getGrid().map((x) => x[i]);
        let flatColumn = column.join("");
        flattenedColumns[i] = flatColumn;
    }

    const hasWinningColumn = (column) => winningColumns.includes(column);

    let columnResult = flattenedColumns.some(hasWinningColumn);

    return columnResult;

}

const checkDiagonal = () => { 

    let winningDiagonals = ["XXX","OOO"];

  let leftDiagonal = theGrid.getGrid().map((row,index) =>  row[index]);
  let rightDiagonal = theGrid.getGrid().map((row,index) => row[theGrid.getGrid().length-1 - index]);

  let bothDiagonals = [leftDiagonal.join(""),rightDiagonal.join("")];
  
//   console.log(bothDiagonals, bothDiagonals.length);

  const hasWinningDiagonal = (diagonal) => winningDiagonals.includes(diagonal);

  let diagonalResult = bothDiagonals.some(hasWinningDiagonal);

  return diagonalResult;

  }

  const checkBoardHasSpace = () => { 

    let flatGrid = theGrid.getGrid().flat();
    // flattening the grid to use include, otherwise does not work with nested arrays. 

//   console.log(flatGrid);

  let result = flatGrid.includes(0);

  return result;
 
    // return theGrid.getGrid().includes(0);
  }

//   let gameResult = "";

const checkGameResult = () => { 
    // Only call these checks once
    if (checkRow() || checkColumn() || checkDiagonal()) {
        const result = `GAME OVER. ${getActivePlayer().name} wins. Please refresh the page to start again.`;
        console.log(result);
        return result;
    } else if (checkBoardHasSpace()) { 
        return null; // Game continues
    } else {
        const result = `It's a DRAW. No one wins. Well played. Refresh the page to play another round.`;
        console.log(result);
        return result;
    }
};


//   const checkGameResult = () => { 

//     checkColumn();
//     checkRow();
//     checkDiagonal();

    

//     if (checkColumn() === true || checkRow() === true || checkDiagonal() === true ) { 
//       const result = `GAME OVER. ${getActivePlayer().name} wins. Please refresh the page to start again.`;
//       console.log(result);
//       console.log(theGrid.getGrid());
//       return result;

       
//     } else if (checkBoardFull() === false) { 
//         // && (checkRow() === false && checkColumn() === false && checkDiagonal() === false)
//        const result = `It's a DRAW. No one wins. Well played. Refresh the page to play another round.`;
//         console.log(theGrid.getGrid());
//         console.log(result);
//         return result;
//     // } else if (theGrid.placeMarker() === false) { 
//     //          console.log(`That spot's taken G. Pick another.`)
//     //          console.log(printNewRound());
//     } else {
//         switchPlayerTurn();
//         printNewRound();
//         return null;
//         // let gameResult = console.log("What up manss");
//         // return gameResult;
//     }
   
// }

// what does checkgameresult do: 
// each PLAYER TURN: 
// calls check diagonal, column and row.
//if any are true, game is WON by the ACTIVEPLAYER
// if none are true > moves on to 
// if board is full > result is a DRAW.
// if neither wins or board full, only then > 
// switch move and display board (aka continue game)


//check Game result: 
// check if either of the 3 wins are true. If so, assign WIN to Active player. 

// gameflow: 
// each turn/click,
// call checkgameresult
//



// const makeMove = (xCoord,yCoord) => { 
//     console.log(`${getActivePlayer().name} dropping ${getActivePlayer().marker} into ${xCoord},${yCoord}...` );
//     const moveValid =  theGrid.placeMarker(xCoord,yCoord);

//     if (!moveValid) { 
//         console.log("That spot's taken my G. Pick another one");
//         return;
//     }
//     // if (theGrid.getGrid()[xCoord][yCoord] !== 0) {   
//      else { 
       
//         checkGameResult();
//     }
    
    
//     // switchPlayerTurn();
//     // printNewRound();
// }

const makeMove = (xCoord, yCoord) => { 
    console.log(`${getActivePlayer().name} dropping ${getActivePlayer().marker} into ${xCoord},${yCoord}...`);
    const moveValid = theGrid.placeMarker(xCoord, yCoord);

    if (!moveValid) { 
        console.log("That spot's taken. Pick another one.");
        return;
    }

    // Check the result after making a move
    const result = checkGameResult();

    if (result) {
        displayController.displayResult(result); // Display the result in the DOM
    } else {
        switchPlayerTurn();
        printNewRound();
    }
};


 
return { printNewRound,switchPlayerTurn, getActivePlayer, printNewRound, makeMove , checkRow, checkColumn, checkDiagonal,checkBoardHasSpace,  checkGameResult };

 
}







const gameplay = GameController();
gameplay.printNewRound();



const displayDOMController = () => { 

   
    let container = document.getElementById("container");
    const introDiv = document.getElementById("game-instructions");

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    introDiv.appendChild(resultDiv);
    

    const createDisplayBoard = () => { 

        for (let row=0; row < theGrid.getGrid().length; row++) { 
            for (let column = 0; column< theGrid.getGrid()[row].length; column++) { 
                 let cellDiv = document.createElement("div");
                 cellDiv.setAttribute("x-coordinate",row);
                 cellDiv.setAttribute("y-coordinate",column);
                 cellDiv.classList.add("cell");
                 container.appendChild(cellDiv);

            }
        }

    }

    // const displayMoves = () => { 
    //     for (let row=0; row < theGrid.getGrid().length; row++) { 
    //         for (let column = 0; column< theGrid.getGrid()[row].length; column++) {
    //             const value = theGrid.getGrid()[row][column];
    //             const cellDiv = container.querySelector(
    //                 `[x-coordinate="${row}"][y-coordinate="${column}"]`
    //             );
    //             // Update the text content based on the grid value
    //             cellDiv.textContent = value === 0 ? "" : value;
    //         }
    //     }
    
                
    //  }

     const displayTurn = () => { 
        
        let turnDiv = document.getElementById("whose-turn");
        turnDiv.textContent = `${gameplay.getActivePlayer().name}'s turn.`;
        introDiv.appendChild(turnDiv);
     }
        
    
        // for (let row=0; row < theGrid.getGrid().length; row++) { 
        //     for (let column = 0; column< theGrid.getGrid()[row].length; column++) { 
        //          let cellDiv = document.createElement("div");
        //          cellDiv.setAttribute("x-coordinate",row);
        //          cellDiv.setAttribute("y-coordinate",column);
        //          cellDiv.classList.add("cell");
                
        //         if (theGrid.getGrid()[row][column]=== 0) { 
        //             cellDiv.textContent = '';
        //         } else {
        //             cellDiv.textContent = theGrid.getGrid()[row][column];
        //         }
        //         container.appendChild(cellDiv);
                      
        //     }

        // }
    

 

    const clickMove = () => {

    
        container.addEventListener("click", function (event) { 
            let cellXCoord = parseInt(event.target.getAttribute("x-coordinate"));
            let cellYCoord = parseInt(event.target.getAttribute("y-coordinate"));
            // console.log(cellXCoord,cellYCoord);
            gameplay.makeMove(cellXCoord,cellYCoord);
            event.target.textContent = theGrid.getGrid()[cellXCoord][cellYCoord];
            displayTurn();

            // const result = gameplay.checkGameResult();
            

            // const result = gameplay.checkGameResult();
            // if (result) { 
            //     displayResult(result);
            // }  else { }
            // resultIntegration();
    
            
            
        } )
     }

    const displayResult = (result) => { 
        if (result) { 
            resultDiv.textContent = result;
        } else { 
            resultDiv.textContent = "";
        }

       
    }



    createDisplayBoard();
    clickMove();
    displayTurn();
    


    return {createDisplayBoard, clickMove, displayTurn, displayResult, displayResult,  }

}

const displayController = displayDOMController();

// const resultIntegration = () => { 
//     const result = gameplay.checkGameResult();
//     console.log(result);
//     displayDOMController().displayResult(result);
// }



// FOR FRIDAY: 
// complete the requirements from point 6. 
// Currently need a way to 'use' the return statement from the 'checkgameresult' to display it on screen. 
// lots of convolution in checkgameresult more than just checking result so may need to separate somehow.




