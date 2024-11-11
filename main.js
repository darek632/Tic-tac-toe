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




    return {createGrid, logBoard, placeMarker};

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

const checkForWinner = () => {

    // check rows using every

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
}

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



    // what needs to go into player object: 
    // each player is an object including name: 
    // marker 
    // whatever else that we might want to add later on 









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



