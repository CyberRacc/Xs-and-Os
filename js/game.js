
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

// Store the gameboard as an array inside of a Gameboard object.
const Gameboard = {

    // Array to store current state of the board.
    // Each array element represents each cell in the game.
    // Empty strings should be filled with an X or an O as the game goes on.
    gameboard: [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

}

// Module containing general functions.
const GeneralFunctions = {
    createBoard: () => {
        const btnCancelForm = document.querySelector("#btn-cancel-form");
        btnCancelForm.addEventListener("click", e => {
            modal.close();
        });
        const btnStartGame = document.querySelector("#btn-start-game");
        btnStartGame.addEventListener("submit", e => {
            const mainContent = document.querySelector(".main");
            e.preventDefault();
            mainContent.innerHTML = `
            <div id="board-container">
                <div id="board">
                    <div class="board-square"><img src="assets/icons/circle.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/circle.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/cross.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/cross.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/circle.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/circle.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/cross.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/cross.svg" alt=""></div>
                    <div class="board-square"><img src="assets/icons/circle.svg" alt=""></div>
                </div>
            </div>
            <div id="game-controls">
                <button>New Game</button>
            </div>
            `;
        });
    }
}

// Factory function for creating players.


// Module containing functions for when the game is actually running.
const PlayGame = (() => {
    // Private functions

/*     I've gone for arrow functions here as I prefer them and do not
    need the "this" keyword.

    The main difference between arrow functions and traditional
    function declarations is that arrow functions don't have their own
    "this", they inherit "this" from the enclsosing scope.

    Tranditional function declarations have their own "this" binding,
    which is typically set by how they are called. */

    const checkMoveValidity = () => {
        // Is the selected cell empty?
        // If it is, move is valid.
        // Otherwise, move is invalid.
    }

    const makeMove = () => {
        // When player clicks a cell, add their X or O to the cell.
        // Grab the index of the cell that was clicked.
    }

    const checkWin = () => {
        // Check for 3 of the same letter in a row.
    }

    const createPlayer = (name, symbol) => {

        const nameInput = document.querySelector("#player-name");
        const playerName = nameInput.value;
        
        return {
            name: playerName,
            symbol: "X"
        };
    }

    const playerX = createPlayer("CyberRacc", "X");
    const playerO = createPlayer("CPU", "O");
    
    return {
        // Public functions

        // Do not use () as this will invoke the functions, these are to be
        // called later.

        makeMove,
        checkWin,
    }
})();



const startGame = (() => {

    const btnPlay = document.querySelector("#btn-play");
    const modal = document.querySelector("#modal");
    

    btnPlay.addEventListener("click", e => {
        console.log(e);
        modal.showModal();
        createBoard();
    });
    return modal; // now in the public scope

})(); // EIFE (Immediately invoked function expression)
