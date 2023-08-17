
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

    gameboard: [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

}


// Factory function for creating players.
function createPlayer(name, symbol) {
    return {
        name: name,
        symbol: symbol,
        makeMove: function(position) {
            // logic for making a move
        }
    };
}

const playerX = createPlayer("CyberRacc", "X");
const playerO = createPlayer("CPU", "O");

const startGame = function() {

    const btnPlay = document.querySelector("#btn-play");
    const modal = document.querySelector("#modal");

    btnPlay.addEventListener("click", e => {
        console.log(e);
        modal.showModal();
        createBoard();
    });
}(); // EIFE (Immediately invoked function expression)

function createBoard() {
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

