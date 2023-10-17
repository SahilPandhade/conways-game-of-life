# Conway's Game of Life

A implementation of Popular Cellular automaton Conway's Game of Life in React.JS and Typescript

## What is Conway's Game of Life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.It is a zero-player game,meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine. Read more [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life):

### Rules for Conway's Game of Life
The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
These rules, which compare the behaviour of the automaton to real life, can be condensed into the following:

Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.

### Version 2

The current version has a new dropdown option to select a predefined pattern to observe the output for the chosen options.
Currently the patterns supported are:
1. Gosper-Glider
2. LWSS
3. Glider
4. Pulsar
5. Beehive
6. Acorn

## What I am working on next ?

I will be adding more predefined patterns to the application for better user experience.Also I am planning to add a option for user to resize the grid size and the ability for user to see in real-time the number of cells alive/dead in the current generation.

Thank you for visiting!


## Authors

- [@SahilPandhade](https://github.com/SahilPandhade)


## Acknowledgements

 - [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)


