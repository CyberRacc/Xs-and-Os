

const gameState = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
    players: {
        human: {name: "", symbol: "", winner: false},
        cpu: {name: "CPU", symbol: "", winner: false}
    } // add comma here if adding stuff
}

// Module containing functions for when the game is actually running.
const gameLogic = (() => {

    // Factory function for creating players. Currently unsused, need to figure out how to use this alongside updatePlayers and gameState.
    const createPlayer = (name, symbol) => {
        return {
            name,
            symbol
        };
    }

    const updatePlayers = () => {

        const nameInput = document.getElementById("player-name");
        const symbolInput = document.getElementById("player-symbol");
        const playerName = nameInput.value;
        const playerSymbol = symbolInput.value;

        gameState.players.human.symbol = playerSymbol;
        gameState.players.human.name = playerName;

        // Ternary operator makes the cpuSymbol the opposite of the human player's symbol.
        // If playerSymbol is "X" then cpuSymbol is "O", otherwise cpuSymbol is "X".        const humanPlayer = createPlayer(playerName);
        gameState.players.cpu.symbol = gameState.players.human.symbol === "X" ? "O" : "X";
    }

    const checkMoveValidity = (currentCellIndex) => {
        if (gameState.gameboard[currentCellIndex] === "") {
            // Checks if the current index in the gameboard array is an empty string.
            // If it is the move is valid.
            return true;
        } else {
            return false;
        }
    }

    const makeMove = () => {
        const gameCells = document.querySelectorAll(".board-cell");

        gameCells.forEach(cell => {
            cell.addEventListener("click", () => {
                
                // Grab the index of the cell that was clicked & convert to number.
                let currentCellIndex = Number(cell.dataset.index);

                if (checkMoveValidity(currentCellIndex)) {
                    gameState.gameboard.splice(currentCellIndex, 1, gameState.players.human.symbol);

                    domController.updateCells(); // Assign current player's X or O to that cell.
                    
                    if (checkWin()) {
                        gameState.players.human.winner = true;
                        domController.endGame();
                    }
    
                    // Make CPU easy move
                    cpuLogic.cpuEasyMove();
                }
            });
        });
    }

    const checkWin = () => {
        // Check for 3 of the same letter in a row.
        // shorthand for gameboard array
        const board = gameState.gameboard;
        
        // These are the possible winning combinations in a Tic Tac Toe game.
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

        // The .some() method tests whether at least one element in the array 
        // passes the test implemented by the provided function.
        // In this case, it checks if any of the winningCombinations lead to a win.
        const isWin = winningCombinations.some(winComb => {
    
            // The .every() method tests whether all elements in the array 
            // pass the test implemented by the provided function.
            // Here, it checks if all positions in the current winComb have the value "X" on the board.
            if (winComb.every(position => board[position] === "X")) {
                return true;  // Return true to indicate a win for "X"
            } 
            // Similarly, this checks if all positions in the current winComb have the value "O" on the board.
            else if (winComb.every(position => board[position] === "O")) {
                return true;  // Return true to indicate a win for "O"
            }
    
            // If neither of the above conditions is met, return false for this winComb.
            return false;
        });
    
        return isWin;  // This will be true if there's a win, otherwise false.
    }    

    return {
        checkMoveValidity,
        makeMove,
        checkWin,
        createPlayer,
        updatePlayers
    };

})(); // IIFE (Immediately Invoked Function Expression)


// Module containing logic for CPU moves, two difficulties, easy and hard.
const cpuLogic = (() => {

    const getRandomMove = () => {
        let randomMove = Math.floor(Math.random() * 9);
        return randomMove;
    }

    const cpuEasyMove = () => {
        // Easy it a random number so the cpu does not actively try to win.
        // Use random number from 0 to 8 to get random move.
        // Check if number is a valid move.

        let validMoveLoopChecker = false;

        // BUG: Infinite loop occurs when selecting the last tile on the board.
        while (!validMoveLoopChecker) {
            let currentCellIndex = getRandomMove();

            if (gameLogic.checkMoveValidity(currentCellIndex)) {

                gameState.gameboard.splice(currentCellIndex, 1, gameState.players.cpu.symbol);
                domController.updateCells(currentCellIndex);
                validMoveLoopChecker = true;
            }
        }
        if (gameLogic.checkWin()) {
            gameState.players.cpu.winner = true;
            domController.endGame();
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

        const btnPlay = document.getElementById("btn-play");
        const modal = document.getElementById("modal");

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

            e.preventDefault();

            const mainContent = document.querySelector(".main");

            gameLogic.updatePlayers();
            modal.close();

            mainContent.innerHTML = `
            <div id="board-container">
                <div>
                    <p>Hello ${gameState.players.human.name}!<p>
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
            domController.iconHover();
            gameLogic.makeMove();
        });
    }

    const updateCells = () => {

        // The forEach method, takes two arguments, the first is the element in the array, the second is the index
        // of that element.
        gameState.gameboard.forEach((currentValue, currentIndex) => {

            // currentIndex is null? need to look at why, probably just an issue of when the updateCells function is called.
            let currentCell = document.querySelector(`[data-index="${currentIndex}"]`);

            if (currentValue === "O") {
                // Update cell with image of Panda.
                currentCell.innerHTML = `<img src="assets/icons/panda-bear-panda-svgrepo-com.svg" alt="">`;
            } else if (currentValue === "X") {
                // Update cell with image of Raccoon.
                currentCell.innerHTML = `<img src="assets/icons/raccoon-svgrepo-com.svg" alt="">`;
            }
        });
    }

    const iconHover = () => {
        const gameCells = document.querySelectorAll(".board-cell");

        gameCells.forEach((cell) => {
            cell.addEventListener("mouseover", e => {
                gameState.players.human.symbol === "X" ? cell.classList.add("hover-raccoon") : cell.classList.add("hover-panda");
            });
        });

        gameCells.forEach((cell) => {
            cell.addEventListener("mouseout", e => {
                cell.classList.remove("hover-raccoon");
                cell.classList.remove("hover-panda");
            });
        });
    }

    const endGame = () => {
        const mainContent = document.querySelector(".main");

        let winnerName = gameState.players.cpu.winner ? gameState.players.cpu.name : gameState.players.human.name;
        let winnerSymbol = gameState.players.cpu.winner ? gameState.players.cpu.symbol : gameState.players.human.symbol;

        let winnerIconUpdate = winnerSymbol === "X" ? "assets/icons/raccoon-svgrepo-com.svg" : "assets/icons/panda-bear-panda-svgrepo-com.svg";

        mainContent.innerHTML = `
        <div id="display-winner">
            <img src="${winnerIconUpdate}" alt="">
            <h2>${winnerName} Wins!</h2>
            <button id="btn-play-again">Play Again</button>
        </div>
        `;
        resetGame();
    }

    const resetGame = () => {
        const btnPlayAgain = document.getElementById("btn-play-again");
        const mainContent = document.querySelector(".main");
        const modal = document.getElementById("modal")
;
        btnPlayAgain.addEventListener("click", e => {
            gameState.players.cpu.winner = false;
            gameState.players.human.winner = false;
            gameState.gameboard = ["", "", "", "", "", "", "", "", ""];

            mainContent.innerHTML = `<button id="btn-play">Play</button>`
            modal.showModal();
            startGame();
            createBoard();
        });
    }

    return {
        startGame,
        createBoard,
        updateCells,
        iconHover,
        endGame
    }

})(); // IIFE

domController.startGame();
