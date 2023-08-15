
/*
    The main goal of this project is to have as little global code
    as possible.

    Tips:

        If you only need one of something (gameBoard, displayController),
        use a module.

        If you need multiples of something (players), create
        them with factories.
*/

// Store the gameboard as an array inside of a Gameboard object.
const Gameboard = () => {
    return {
        gameboard: [],
        playerName: name,
        cpuPlayer: true,
        getPlayerName: () => {
            // Logic to grab player name from form to be added later.
        }
    }
}