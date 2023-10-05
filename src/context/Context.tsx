import React, { useState, useEffect, useRef, createContext } from 'react';

interface GameContextProps {
    rows: number;
    setRows: React.Dispatch<React.SetStateAction<number>>,
    cols: number;
    setCols: React.Dispatch<React.SetStateAction<number>>,
    gridState: boolean[][];
    setGridState: React.Dispatch<React.SetStateAction<boolean[][]>>;
    startSim: boolean;
    setStartSim: React.Dispatch<React.SetStateAction<boolean>>;
    reset: boolean;
    setReset: React.Dispatch<React.SetStateAction<boolean>>;
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    updateGrid: () => void;
    countNeighbour: (gridState: boolean[][], row: number, col: number) => number;
    ChangeInitialPattern: (option: string) => void;
}
const defaultContext: GameContextProps = {
    rows: 20,
    setRows: () => { },
    cols: 20,
    setCols: () => { },
    gridState: Array.from({ length: 20 }, () => Array(20).fill(false)),
    setGridState: () => { },
    startSim: false,
    setStartSim: () => { },
    reset: false,
    setReset: () => { },
    timerRef: { current: null },
    updateGrid: () => { },
    countNeighbour: () => 0,
    ChangeInitialPattern: () => { },
};

const GameContext = createContext<GameContextProps>(defaultContext);

interface GameProviderProps {
    children: React.ReactNode
}
const GameProvider = ({ children }: GameProviderProps) => {
    const [gridState, setGridState] = useState<boolean[][]>([]);
    const [startSim, setStartSim] = useState(false);
    const [reset, setReset] = useState(false);
    const [rows, setRows] = useState(40);
    const [cols, setCols] = useState(40)
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ChangeInitialPattern = (option: String = "") => {
        const newGrid: boolean[][] = []
        for (let i = 0; i < rows; i++) {
            newGrid.push(Array.from(Array(cols), () => false))
        }
        const centerOfRows = Math.floor(rows / 2);
        const centerOfCols = Math.floor(cols / 2);
        if (option === 'lwss') {
            newGrid[centerOfRows - 1][centerOfCols + 2] = true;
            newGrid[centerOfRows - 1][centerOfCols + 5] = true;
            newGrid[centerOfRows][centerOfCols + 1] = true;
            newGrid[centerOfRows + 1][centerOfCols + 1] = true;
            newGrid[centerOfRows + 1][centerOfCols + 3] = true;
            newGrid[centerOfRows + 1][centerOfCols + 4] = true;
            newGrid[centerOfRows + 2][centerOfCols + 1] = true;
            newGrid[centerOfRows + 2][centerOfCols + 2] = true;
            newGrid[centerOfRows + 2][centerOfCols + 5] = true;
        }
        else if (option === "snake") {
            newGrid[centerOfRows][centerOfCols] = true;
            newGrid[centerOfRows][centerOfCols + 1] = true;
            newGrid[centerOfRows][centerOfCols + 2] = true;
            newGrid[centerOfRows - 1][centerOfCols + 2] = true;
            newGrid[centerOfRows - 1][centerOfCols + 1] = true;
            newGrid[centerOfRows - 1][centerOfCols] = true;
        } else if (option === "glider") {
            newGrid[centerOfRows - 1][centerOfCols] = true;
            newGrid[centerOfRows][centerOfCols + 1] = true;
            newGrid[centerOfRows][centerOfCols + 2] = true;
            newGrid[centerOfRows - 1][centerOfCols + 2] = true;
            newGrid[centerOfRows - 2][centerOfCols + 2] = true;
        } else if (option === "pulsar") {
            newGrid[centerOfRows - 6][centerOfCols - 4] = true;
            newGrid[centerOfRows - 6][centerOfCols - 3] = true;
            newGrid[centerOfRows - 6][centerOfCols - 2] = true;

            newGrid[centerOfRows - 4][centerOfCols - 6] = true;
            newGrid[centerOfRows - 3][centerOfCols - 6] = true;
            newGrid[centerOfRows - 2][centerOfCols - 6] = true;

            newGrid[centerOfRows - 4][centerOfCols - 1] = true;
            newGrid[centerOfRows - 3][centerOfCols - 1] = true;
            newGrid[centerOfRows - 2][centerOfCols - 1] = true;

            newGrid[centerOfRows - 1][centerOfCols - 4] = true;
            newGrid[centerOfRows - 1][centerOfCols - 3] = true;
            newGrid[centerOfRows - 1][centerOfCols - 2] = true;

            //Block-2
            newGrid[centerOfRows - 6][centerOfCols + 4] = true;
            newGrid[centerOfRows - 6][centerOfCols + 3] = true;
            newGrid[centerOfRows - 6][centerOfCols + 2] = true;

            newGrid[centerOfRows - 4][centerOfCols + 6] = true;
            newGrid[centerOfRows - 3][centerOfCols + 6] = true;
            newGrid[centerOfRows - 2][centerOfCols + 6] = true;

            newGrid[centerOfRows - 4][centerOfCols + 1] = true;
            newGrid[centerOfRows - 3][centerOfCols + 1] = true;
            newGrid[centerOfRows - 2][centerOfCols + 1] = true;

            newGrid[centerOfRows - 1][centerOfCols + 4] = true;
            newGrid[centerOfRows - 1][centerOfCols + 3] = true;
            newGrid[centerOfRows - 1][centerOfCols + 2] = true;

            //Block-3
            newGrid[centerOfRows + 1][centerOfCols - 4] = true;
            newGrid[centerOfRows + 1][centerOfCols - 3] = true;
            newGrid[centerOfRows + 1][centerOfCols - 2] = true;

            newGrid[centerOfRows + 4][centerOfCols - 6] = true;
            newGrid[centerOfRows + 3][centerOfCols - 6] = true;
            newGrid[centerOfRows + 2][centerOfCols - 6] = true;

            newGrid[centerOfRows + 6][centerOfCols - 4] = true;
            newGrid[centerOfRows + 6][centerOfCols - 3] = true;
            newGrid[centerOfRows + 6][centerOfCols - 2] = true;

            newGrid[centerOfRows + 4][centerOfCols - 1] = true;
            newGrid[centerOfRows + 3][centerOfCols - 1] = true;
            newGrid[centerOfRows + 2][centerOfCols - 1] = true;

            //Block-4
            newGrid[centerOfRows + 1][centerOfCols + 4] = true;
            newGrid[centerOfRows + 1][centerOfCols + 3] = true;
            newGrid[centerOfRows + 1][centerOfCols + 2] = true;

            newGrid[centerOfRows + 4][centerOfCols + 6] = true;
            newGrid[centerOfRows + 3][centerOfCols + 6] = true;
            newGrid[centerOfRows + 2][centerOfCols + 6] = true;

            newGrid[centerOfRows + 6][centerOfCols + 4] = true;
            newGrid[centerOfRows + 6][centerOfCols + 3] = true;
            newGrid[centerOfRows + 6][centerOfCols + 2] = true;

            newGrid[centerOfRows + 4][centerOfCols + 1] = true;
            newGrid[centerOfRows + 3][centerOfCols + 1] = true;
            newGrid[centerOfRows + 2][centerOfCols + 1] = true;
        } else if (option === "beehive") {
            newGrid[centerOfRows - 1][centerOfCols] = true;
            newGrid[centerOfRows - 1][centerOfCols + 1] = true;
            newGrid[centerOfRows][centerOfCols - 1] = true;
            newGrid[centerOfRows + 1][centerOfCols] = true;
            newGrid[centerOfRows + 1][centerOfCols + 1] = true;
            newGrid[centerOfRows][centerOfCols + 2] = true;
        }
        else if (option === 'gosper-glider') {
            const gliderGun = [
                [1, 5], [1, 6], [2, 5], [2, 6],  // block
                [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6],  // left part
                [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6],  // right part
                [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7],  // left part
                [35, 3], [35, 4], [36, 3], [36, 4]  // right part
            ];

            gliderGun.forEach(([x, y]) => {
                const adjustedX = centerOfCols + x - 18;  // Adjusted for centering
                const adjustedY = centerOfRows + y - 6;  // Adjusted for centering

                if (adjustedX >= 0 && adjustedX < cols && adjustedY >= 0 && adjustedY < rows) {
                    newGrid[adjustedY][adjustedX] = true;
                }
            });
        }
        else if (option === "acorn") {
            const acornCoords = [
                [1, 0],
                [3, 1],
                [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]
            ];

            acornCoords.forEach(([x, y]) => {
                const adjustedX = centerOfCols + x - Math.floor(acornCoords.length / 2);
                const adjustedY = centerOfCols + y - Math.floor(acornCoords[0].length / 2);

                if (adjustedX >= 0 && adjustedX < cols && adjustedY >= 0 && adjustedY < rows) {
                    newGrid[adjustedY][adjustedX] = true;
                }
            });
        }
        else {
            updateGrid()
        }

        setGridState(newGrid)
    }
    const updateGrid = () => {
        setGridState((prevGrid: boolean[][]) => {
            const newGrid = [];
            for (let i = 0; i < rows; i++) {
                newGrid.push(Array.from(Array(cols), () => false));
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const neighbours = countNeighbour(prevGrid, i, j);
                    const currentCell = prevGrid[i][j];
                    if (currentCell && (neighbours < 2 || neighbours > 3)) {
                        newGrid[i][j] = false; // Underpopulation or overpopulation,Cell Dies.
                    } else if (!currentCell && neighbours === 3) {
                        newGrid[i][j] = true; // Cell Click or exact 3 neighbours,Cell becomes alive.
                    } else {
                        newGrid[i][j] = currentCell; // Cell remains the same
                    }
                }
            }
            return newGrid;
        });
    }

    const countNeighbour = (gridState: boolean[][], row: number, col: number) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;

                // Check if the neighbor is within the grid boundaries
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    count += gridState[newRow][newCol] ? 1 : 0;
                }
            }
        }
        return count;
    }
    useEffect(() => {
        setStartSim(false);
        const grid: boolean[][] = []
        for (let i = 0; i < rows; i++) {
            grid.push(Array.from(Array(cols), () => Math.random() < 0.5));
        }
        setGridState(grid)
    }, [reset])

    useEffect(() => {
        if (startSim) {
            timerRef.current = setInterval(() => {
                updateGrid();
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [startSim]);
    const contextValue: GameContextProps = {
        rows,
        setRows,
        cols,
        setCols,
        gridState,
        setGridState,
        startSim,
        setStartSim,
        reset,
        setReset,
        timerRef,
        updateGrid,
        countNeighbour,
        ChangeInitialPattern
    };
    return (
        <GameContext.Provider
            value={contextValue}
        >
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext };
