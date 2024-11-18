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
        }
        else if (grid[xCoord][yCoord] === 0) { 
            grid[xCoord][yCoord] = gameplay.getActivePlayer().marker;


        }
      
        
    }




    return {createGrid, getGrid, logBoard, placeMarker};

}

const theGrid = Gameboard();

theGrid.createGrid();





function GameController() { 


    let playerOneName = "Player ONE X";
    let playerTwoName = "Player TWO O";
 
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
};

const getActivePlayer = () => activePlayer;

const printNewRound = () => { 
    theGrid.logBoard();
    console.log( 
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

  const checkBoardFull = () => { 

    let flatGrid = theGrid.getGrid().flat();
    // flattening the grid to use include, otherwise does not work with nested arrays. 

//   console.log(flatGrid);

  let result = flatGrid.includes(0);

  return result;
 
    // return theGrid.getGrid().includes(0);
  }
  

  const checkGameResult = () => { 

    checkColumn();
    checkRow();
    checkDiagonal();

    if (checkColumn() === true || checkRow() === true || checkDiagonal() === true ) { 
        let gameResult = console.log(`GAME OVER. ${getActivePlayer().name} wins. Please refresh the page to start again.`)
        console.log(theGrid.getGrid());
        return gameResult;
    } else if (checkBoardFull() === false) { 

        // && (checkRow() === false && checkColumn() === false && checkDiagonal() === false)
        let gameResult = console.log(`It's a DRAW. No one wins. Well played. Refresh the page to play another round.`)
        console.log(theGrid.getGrid());
        return gameResult;
    } else {
        switchPlayerTurn();
        printNewRound();
    }
 

  }


const makeMove = (xCoord,yCoord) => { 
    console.log(`${getActivePlayer().name} dropping ${getActivePlayer().marker} into ${xCoord},${yCoord}...` );
    theGrid.placeMarker(xCoord,yCoord);
    checkGameResult();
    // switchPlayerTurn();
    // printNewRound();
}

return { printNewRound,switchPlayerTurn, getActivePlayer, printNewRound, makeMove, checkRow, checkColumn, checkDiagonal,checkBoardFull,  checkGameResult };
}

const gameplay = GameController();
gameplay.printNewRound();



const displayDOMController = () => { 

   
    let container = document.getElementById("container");

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

    const displayMoves = () => { 
        for (let row=0; row < theGrid.getGrid().length; row++) { 
            for (let column = 0; column< theGrid.getGrid()[row].length; column++) {
                const value = theGrid.getGrid()[row][column];
                const cellDiv = container.querySelector(
                    `[x-coordinate="${row}"][y-coordinate="${column}"]`
                );
                // Update the text content based on the grid value
                cellDiv.textContent = value === 0 ? "" : value;
            }
        }
    
                
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
            console.log(cellXCoord,cellYCoord);
            gameplay.makeMove(cellXCoord,cellYCoord);
            event.target.textContent = theGrid.getGrid()[cellXCoord][cellYCoord];

            
            
        } )
     }

    createDisplayBoard();
    clickMove();
  


    return {createDisplayBoard, clickMove }

}

displayDOMController();










    

 



    // const column1 = colGrid.map((x) => x[0])

    // console.log(column1);
    // const flatColumn = column1.join("");

    // console.log(flatColumn);
    

//     console.log(colGrid[0], colGrid[0][0]);

//    let column1 = colGrid[0][0].concat(colGrid[1][0],colGrid[2][0]);

//    console.log(column1);

//    let column2 = colGrid[0][1].concat(colGrid[1][1],colGrid[2][1]);

//    console.log(column2);

//    let column3 = colGrid[0][2].concat(colGrid[1][2],colGrid[2][2]);

//    console.log(column3);


// what am i trying to map: 






   








    // active player = p1 
    // roundSwitch = if active == p1 then active = p2 
    // else if active == p2 active = p1

    // print new round { 
    // prints board and declares whose turn it is}
    


    //makeMove function { 
    // console log, dropping activePlayer token into x,y..
    // call dropToken into x,y, using player.marker (from the player object)

    // after each move, we will need to add logic to check for any 3 in a row. if so > declare winner.


    // call roundSwitch
    // call PrintNewRound



