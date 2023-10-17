export interface GameContextProps {
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
    currentlyAliveCells: number;
    currentlyDeadCells: number;
}

export interface GameProviderProps {
    children: React.ReactNode
}

export interface GridProps {
    grid: boolean[][];
    onCellClick: (position: { row: number, col: number }) => void
  }