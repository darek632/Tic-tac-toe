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
        //     ["X","O","X"],
        //     [0, "X", 0],
        //     ["O","X","O"],
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


    let playerOneName = "Player ONE";
    let playerTwoName = "Player TWO";
 
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

    // sampleGrid = [
    //     ["X","X","O"],
    //     ["O","O","O"],
    //     ["X","O","X"],
    // ];

    let winningRows = ["XXX","OOO"];

  const flattenedArray = theGrid.getGrid().map((subArray) => subArray.join(""));

//   console.log(flattenedArray,typeof(flattenedArray[0]));
//   console.log(typeof(winningRows[0]));

const hasWinningRow = (row) => winningRows.includes(row);

//callback function to use for some. takes in each element (row) in flattenedArray and returns true if this is matches a winning row,
  // either XXX or OOO. 

let rowResult = flattenedArray.some(hasWinningRow);

return rowResult;
// using some to check if 1 of the flatened rows (elements) has a winning sequence, 3 Xs or 3 Os.
}


const checkColumn = () => { 

    // colGrid = [
    //     ["O", "X","O"],
    //     ["O","O","X"],
    //     ["O","X","O"],

    // ];

    let winningColumns = ["XXX","OOO"];
    let flattenedColumns = [];

    for (i=0; i < theGrid.getGrid().length; i++ ) { 
        let column = theGrid.getGrid().map((x) => x[i]);
        let flatColumn = column.join("");
        flattenedColumns[i] = flatColumn;
    }

    // console.log(flattenedColumns);

    const hasWinningColumn = (column) => winningColumns.includes(column);

    let columnResult = flattenedColumns.some(hasWinningColumn);

    return columnResult;

}

const checkDiagonal = () => { 

    // sampleGrid = [
    //     ["O", "O","X"],
    //     ["X","O","O"],
    //     ["X","X","O"],
    // ];

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
        console.log(`GAME OVER. ${getActivePlayer().name} wins. Please refresh the page to start again.`)
        console.log(theGrid.getGrid());
    } else if (checkBoardFull() === false) { 

        // && (checkRow() === false && checkColumn() === false && checkDiagonal() === false)
        console.log(`It's a DRAW. No one wins. Well played. Refresh the page to play another round.`)
        console.log(theGrid.getGrid());
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


// instructions for setting up the game for first move

gameplay.printNewRound();






    

 



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





const checkBoardFull = () => { 

    grid = [
        ["X","O","X"],
        ["X", "O", "X"],
        ["O","X","O"],
    ];

    let flat = grid.flat();

  console.log(flat);

  let result = flat.includes(0);

  return result;
 
    // return theGrid.getGrid().includes(0);
  }
   








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



