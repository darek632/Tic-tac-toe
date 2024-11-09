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
        // if (grid[xCoord][yCoord] !== 0) { 
        //     return console.log("That spot's taken, pick a different cell to make a move.");
        // }
    
         if (grid[xCoord][yCoord] === 0) { 
            grid[xCoord][yCoord] = "X"

        }
        return logBoard();
        
        
    }




    return {createGrid, logBoard, placeMarker};

}

const theGrid = Gameboard();

theGrid.createGrid();

theGrid.logBoard();


function Player() { 
 
    let player1 = "X";
    let player2 = "O";

}



function GameController() { 


}