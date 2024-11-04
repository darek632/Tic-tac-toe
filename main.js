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
        console.log(grid);
            for (let j=0; j < columns; j++) { 
                grid[i][j] = 0;
                console.log(grid);
            }
        }

    }

    return {createGrid};

}

const theGrid = Gameboard();

theGrid.createGrid();