/*
    The main goal of this project is to have as little global code
    as possible.

    Tips:

        Think of Factory Functions as "Object Creators"

        A factory function at the most basic level is just a function that
        returns an object, that's it.
        When you call this function, it gives you an object back. The beauty
        of this is that you can customise the obejct for different situations
        each time you call the function.

        If you only need one of something (gameBoard, displayController),
        use a module.

        If you need multiples of something (players), create
        them with factories.

        Keep as much as possible private (not exported), exposing only what
        is necessary.

        Ensure that related functionalities are bundles together.
*/

/*     I've gone for arrow functions here as I prefer them and do not
    need the "this" keyword.

    The main difference between arrow functions and traditional
    function declarations is that arrow functions don't have their own
    "this", they inherit "this" from the enclsosing scope.

    Tranditional function declarations have their own "this" binding,
    which is typically set by how they are called. */

const Gameboard = {
    gameboard: [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
}

// Module containing functions for when the game is actually running.
const PlayGame = (() => {
    // Private functions
    
    const checkMoveValidity = (currentCellIndex) => {
        if (Gameboard.gameboard[currentCellIndex] === "") {
            // Checks if the current index in the gameboard array is an empty string.
            // If it is the move is valid.
            console.log("Move is valid");
            return true;
        } else {
            console.log("Move is invalid");
            return false;
        }
    }

    const checkWin = () => {
        // Check for 3 of the same letter in a row.
        // shorthand for gameboard array
        const board = Gameboard.gameboard;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningCombinations.some(winComb => {
            if (winComb == board) {
                console.log("X Wins!");
            }
        });
    }

    const makeMove = () => {
        const gameCells = document.querySelectorAll(".board-cell");

        gameCells.forEach(cell => {
            cell.addEventListener("click", () => {
                
                // Grab the index of the cell that was clicked & convert to number.
                const currentCellIndex = Number(cell.dataset.index);
                console.log(currentCellIndex);

                checkMoveValidity(currentCellIndex);
                Gameboard.gameboard.splice(currentCellIndex, 1, "X");

                console.log(Gameboard.gameboard);
                updateCells(); // Assign current player's X or O to that cell.
                checkWin();
                cpuPlayer.cpuEasyMove();
            });
        });
    }

    const cpuPlayer = (() => {
        const cpuPlayerSymbol = "O";

        const cpuEasyMove = () => {
            // Easy it a random number so the cpu does not actively try to win.
            // Use random number from 0 to 8 to get random move.
            // Check if number is a valid move.

            console.log("CPU Making Easy Move");

            const getRandomMove = () => {
                let randomMove = Math.random * 10;
                console.log(`Random number: ${randomMove}`);
                let currentMove = getRandomMove.randomMove;
                return currentMove;
            }
            
            if (getRandomMove.currentMove > 8) {
                // Number is invalid
                console.log(`CPU move was ${getRandomMove.currentMove}`);
                console.log("CPU move was invalid, rerunning...")
                getRandomMove(); // Re-gen the move.
            } else {
                checkMoveValidity(); // Number is valid, check move validity.
                if (checkMoveValidity == true) {
                    Gameboard.gameboard.splice(currentCellIndex, 1, "O");
                    updateCells(getRandomMove.currentMove);
                    console.log(`Move came back valid: ${getRandomMove.currentMove}`);
                    console.log(Gameboard.gameboard);
                } else {
                    console.log("CPU move was invalid, rerunning...")
                }
            }
        }
        const cpuHardMove = () => {
            // Hard, the AI actively tries to win by blocking the player.
            // But it's boring to never be able to win so there must be a random
            // chance that the AI makes a move that is random. This makes winning rare but possible.

            // Check the current status of the array.
        }

        return {cpuEasyMove};
    })(); // IIFE

    const updateCells = () => {
        Gameboard.gameboard.forEach(currentIndex => {

            // currentIndex is null? need to look at why, probably just an issue of when the updateCells function is called.
            let currentCell = document.querySelector(`[data-index="${currentIndex}"]`);

            if (currentIndex === "X") {
                // Update cell with image of Panda.
                currentCell.innerHTML = `<img src="/assets/icons/panda-bear-panda-svgrepo-com.svg" alt="">`;
            } else if (currentIndex === "O") {
                // Update cell with image of Raccoon.
                currentCell.innerHTML = `<img src="/assets/icons/raccoon-svgrepo-com.svg" alt="">`;
            }
        });
    }
    return {makeMove};
})(); // IIFE

const startGame = (() => {
    const btnPlay = document.querySelector("#btn-play");
    const modal = document.querySelector("#modal");
    const nameInput = document.querySelector("#player-name");

    // Factory function for creating players.
    const createPlayer = () => {
        const playerSymbol = "X"
        return playerSymbol;
    }

    const createBoard = () => {
        modal.addEventListener("reset", () => {
            modal.close();
        });
        modal.addEventListener("submit", e => {
            const mainContent = document.querySelector(".main");
            const playerName = nameInput.value;

            const humanPlayer = createPlayer(playerName);

            e.preventDefault();
            modal.close();
            mainContent.innerHTML = `
            <div id="board-container">
                <div>
                    <p>Hello ${playerName}!<p>
                </div>
                <div id="board">
                    <div class="board-cell" data-index="0"></div>
                    <div class="board-cell" data-index="1"></div>
                    <div class="board-cell" data-index="2"></div>
                    <div class="board-cell" data-index="3"></div>
                    <div class="board-cell" data-index="4"></div>
                    <div class="board-cell" data-index="5"></div>
                    <div class="board-cell" data-index="6"></div>
                    <div class="board-cell" data-index="7"></div>
                    <div class="board-cell" data-index="8"></div>
                </div>
            </div>
            <div id="game-controls">
                <button>New Game</button>
            </div>
            `;

            PlayGame.makeMove(humanPlayer);
        });
    }
    
    btnPlay.addEventListener("click", e => {
        modal.showModal();
        createBoard();
    });

    return modal; // now in the public scope

})(); // IIFE (Immediately invoked function expression)