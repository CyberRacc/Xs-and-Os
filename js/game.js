

const gameState = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
    players: {
        human: {name: "", symbol: "X"},
        cpu: {name: "CPU", symbol: "O"}
    }

    // Ternary operator makes the cpuSymbol the opposite of the human player's symbol.
    // If playerSymbol is "X" then cpuSymbol is "O", otherwise cpuSymbol is "X".
    // let cpuSymbol = humanPlayer.playerSymbol === "X" ? "O" : "X"; // temp while I work out new refactored logic.
}

// Factory function for creating players.
const createPlayer = (name, symbol) => {
    return {
        name,
        symbol
    };
}

// Module containing functions for when the game is actually running.
const gameLogic = (() => {

    const checkMoveValidity = (currentCellIndex) => {
        if (gameState.gameboard[currentCellIndex] === "") {
            // Checks if the current index in the gameboard array is an empty string.
            // If it is the move is valid.
            console.log("Move is valid");
            return true;
        } else {
            console.log("Move is invalid");
            return false;
        }
    }

    const makeMove = () => {
        const gameCells = document.querySelectorAll(".board-cell");

        gameCells.forEach(cell => {
            cell.addEventListener("click", () => {
                
                // Grab the index of the cell that was clicked & convert to number.
                const currentCellIndex = Number(cell.dataset.index);
                console.log(currentCellIndex);

                checkMoveValidity(currentCellIndex);
                gameState.gameboard.splice(currentCellIndex, 1, "X"); // Hard set as "X" for now.

                console.log(gameState.gameboard);
                domController.updateCells(); // Assign current player's X or O to that cell.
                checkWin();
                cpuLogic.cpuEasyMove();
            });
        });
    }

    const checkWin = () => {
        // Check for 3 of the same letter in a row.
        // shorthand for gameboard array
        const board = gameState.gameboard;
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

    return {
        checkMoveValidity,
        makeMove,
        checkWin
    };

})(); // IIFE (Immediately Invoked Function Expression)


// Module containing logic for CPU moves, two difficulties, easy and hard.
const cpuLogic = (() => {

    const getRandomMove = () => {
        let randomMove = Math.floor(Math.random() * 9);
        console.log(`Random number: ${randomMove}`);
        let currentMove = getRandomMove.randomMove;
        return currentMove;
    }

    const cpuEasyMove = () => {
        // Easy it a random number so the cpu does not actively try to win.
        // Use random number from 0 to 8 to get random move.
        // Check if number is a valid move.

        console.log("CPU Making Easy Move");

        getRandomMove();
        
        if (getRandomMove.currentMove > 8) {
            // Number is invalid
            console.log(`CPU move was ${getRandomMove.currentMove}`);
            console.log("CPU move was invalid, rerunning...")
            getRandomMove(); // Re-gen the move.
        } else {
            console.log("Number was valid, checking move validity.")
            gameLogic.checkMoveValidity(); // Number is valid, check move validity.
            if (gameLogic.checkMoveValidity == true) {
                gameState.gameboard.splice(currentCellIndex, 1, cpuSymbol);
                domController.updateCells(getRandomMove.currentMove);
                console.log(`Move came back valid: ${getRandomMove.currentMove}`);
                console.log(gameState.gameboard);
            } else {
                console.log("Random number was valid, but move was not.")
            }
        }
    }

    const cpuHardMove = () => {
        // Hard, the AI actively tries to win by blocking the player.
        // But it's boring to never be able to win so there must be a random
        // chance that the AI makes a move that is random. This makes winning rare but possible.

        // Check the current status of the array.
    }

    return {
        cpuEasyMove,
        cpuHardMove
    };

})(); // IIFE

const domController = (() => {

    const startGame = () => {

        console.log("Running startGame function");

        const btnPlay = document.querySelector("#btn-play");
        const modal = document.querySelector("#modal");    
        
        btnPlay.addEventListener("click", e => {
            modal.showModal();
            createBoard();
        });
    }

    const createBoard = () => {
        modal.addEventListener("reset", () => {
            modal.close();
        });

        modal.addEventListener("submit", e => {
            const mainContent = document.querySelector(".main");
            const nameInput = document.querySelector("#player-name");
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

            gameLogic.makeMove();
        });
    }

    const updateCells = () => {

        // The forEach method, takes two arguments, the first is the element in the array, the second is the index
        // of that element.
        gameState.gameboard.forEach((currentValue, currentIndex) => {

            // currentIndex is null? need to look at why, probably just an issue of when the updateCells function is called.
            let currentCell = document.querySelector(`[data-index="${currentIndex}"]`);

            if (currentValue === "X") {
                // Update cell with image of Panda.
                currentCell.innerHTML = `<img src="/assets/icons/panda-bear-panda-svgrepo-com.svg" alt="">`;
            } else if (currentValue === "O") {
                // Update cell with image of Raccoon.
                currentCell.innerHTML = `<img src="/assets/icons/raccoon-svgrepo-com.svg" alt="">`;
            }
        });
    }

    return {
        startGame,
        createBoard,
        updateCells
    };
})(); // IIFE

domController.startGame();