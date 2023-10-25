import React, { useState, useEffect, useRef, createContext } from 'react';
import { GameContextProps, GameProviderProps, GridStateType } from '../constants/Types';
import { createInitialPattern } from '../constants/helper';

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
    ChangeInitialPattern: () => { },
    currentlyAliveCells: 0,
    currentlyDeadCells: 0,
    generation: 0,
    setGeneration: () => { },
    generationHistory: [Array.from({ length: 20 }, () => Array(20).fill(false))],
    setGenerationHistory: () => { },
};

const GameContext = createContext<GameContextProps>(defaultContext);

const GameProvider = ({ children }: GameProviderProps) => {
    const [gridState, setGridState] = useState<GridStateType>([]);
    const [startSim, setStartSim] = useState(false);
    const [reset, setReset] = useState(false);
    const [rows, setRows] = useState(40);
    const [cols, setCols] = useState(40)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [generation, setGeneration] = useState(0);
    const [generationHistory, setGenerationHistory] = useState<GridStateType[]>([])
    const [currentlyAliveCells, setCurrentlyAliveCells] = useState<number>(0)
    const [currentlyDeadCells, setCurrentlyDeadCells] = useState<number>(0)

    const generateEmptyGrid = (rows: number, cols: number) => {
        return Array.from({ length: rows }, () => Array(cols).fill(false));
    };
    const ChangeInitialPattern = (option: string = "") => {
        const newGrid = createInitialPattern(option,rows,cols)
        // else {
        //     updateGrid()
        // }
        setCurrentlyAliveCells(0)
        setCurrentlyDeadCells(0)
        setGeneration(0)
        setGenerationHistory([newGrid])

        setGridState(newGrid)
    }
    const updateGrid = () => {
        setGridState((prevGrid: boolean[][]) => {
            const newGrid: boolean[][] = generateEmptyGrid(rows, cols);
            let aliveCells = 0;
            let deadCells = 0;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const neighbours = countNeighbour(prevGrid, i, j);
                    const currentCell = prevGrid[i][j];
                    if (currentCell && (neighbours < 2 || neighbours > 3)) {
                        newGrid[i][j] = false; // Underpopulation or overpopulation,Cell Dies.
                        deadCells++;
                    } else if (!currentCell && neighbours === 3) {
                        newGrid[i][j] = true; // Cell Click or exact 3 neighbours,Cell becomes alive.
                        aliveCells++
                    } else {
                        newGrid[i][j] = currentCell; // Cell remains the same
                        if (currentCell) aliveCells++
                    }
                }
            }
            setGenerationHistory((prevGenerations)=>[...prevGenerations,newGrid])
            setCurrentlyAliveCells(aliveCells)
            setCurrentlyDeadCells(deadCells)
            setGeneration((prevGeneration) => prevGeneration + 1)
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
        setCurrentlyAliveCells(0)
        setCurrentlyDeadCells(0)
        setGeneration(0)
        setGenerationHistory([grid])
    }, [reset, rows, cols])

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
        ChangeInitialPattern,
        currentlyAliveCells,
        currentlyDeadCells,
        generation,
        setGeneration,
        generationHistory,
        setGenerationHistory
    };
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext };
