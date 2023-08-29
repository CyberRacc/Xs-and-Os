# Raccoons & Pandas Game
My Noughts and Crosses / Tic Tac Toe game for The Odin Project.

Build with simple HTML, CSS and JavaScript.

## To-Do
- Add the option to play against another player. This will have two options, to define a second player's name, or to play against yourself.
- Utilise the createPlayer factory function. Currently this function is not used, player creation is handled by directly updating the gameState.
- Add a more complex CPU difficulty with the minimax algorithm. May add more difficulties like Easy, Normal, and Hard rather than just Normal and Hard.
- Add a light theme and a toggle to switch between themes.
- Fix infinite loop that occurs when all cells have been filled.

## Goals of this project
- To encapsulate almost everything to avoid global code pollution.
- To create a functional Tic Tac Toe game that can be played with a CPU or with another player.

## Things I learned during this project
- How to organise code into modules, methods and objects and only expose and call what is necessary within the given scope.
- How to properly create and use a factory function.
- How to create, manage and utilise private and public variables, objects, and methods.
- How to create and manage the state of a game inside of a specific object.
- How to use ternary operators in more complex situations.
- How to create a basic CPU player that makes its moves based on a random number.

