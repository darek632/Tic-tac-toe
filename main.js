const body = document.querySelector("body");
const para = document.querySelector("p");

// para.textContent = "Welcome testing testing text content via js";

// body.appendChild(para);


function Gameboard() { 
    const grid = []; 
    rows = 3;
    columns = 3;

    const createGrid = function() { 

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


    let playerOneName = "Player one";
    let playerTwoName = "Player two";
 
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



    // check columns using map

    // check diagonals manually.


    // logic for checking winner goes in here: 
    // filter through the arrays? 
    // if (0,0 === 1,1 === 2,2 OR 
    // 0,0 === 1,0 === 2,0 OR 
    // 0,1 === 1,1 === 2,1 OR
    // 0,2 === 1,2 === 2,2 OR 
    // 0,2 === 1, 1 === 2,0 OR 
    // repeat same for rows 
    // is there a quicker way to check for this?? 

    // then end the game
    // print result
    // print instructions for next round




const makeMove = (xCoord,yCoord) => { 
    console.log(`${getActivePlayer().name} dropping ${getActivePlayer().marker} into ${xCoord},${yCoord}...` );
    theGrid.placeMarker(xCoord,yCoord);
    switchPlayerTurn();

    printNewRound();
}

return { printNewRound,switchPlayerTurn, getActivePlayer, printNewRound, makeMove };
}

const gameplay = GameController();


// instructions for setting up the game for first move

gameplay.printNewRound();


const checkRow = () => {

    sampleGrid = [
        ["X","X","X"],
        ["O","X","O"],
        ["X","O","X"],
    ];

    let winningRows = ["XXX","OOO"];

  const flattenedArray = sampleGrid.map((subArray) => subArray.join(""));

  console.log(flattenedArray,typeof(flattenedArray[0]));
  console.log(typeof(winningRows[0]));

const hasWinningRow = (row) => winningRows.includes(row);

//callback function to use for some. takes in each element (row) in flattenedArray and returns true if this is matches a winning row,
  // either XXX or OOO. 

console.log(flattenedArray.some(hasWinningRow));

// using some to check if 1 of the flatened rows (elements) has a winning sequence, 3 Xs or 3 Os.
 
}

const checkColumn = () => { 

    colGrid = [
        ["X", "O","O"],
        ["O","X","O"],
        ["X","X","O"],

    ];

    let winningColumns = ["XXX","OOO"];
    let flattenedColumns = [];

    for (i=0; i < colGrid.length; i++ ) { 
        let column = colGrid.map((x) => x[i]);
        let flatColumn = column.join("");
        flattenedColumns[i] = flatColumn;
    }

    console.log(flattenedColumns);

    const hasWinningColumn = (column) => winningColumns.includes(column);

    console.log(flattenedColumns.some(hasWinningColumn));




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



