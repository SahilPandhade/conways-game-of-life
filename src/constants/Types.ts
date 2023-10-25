export type GridStateType=boolean[][]

export interface GameContextProps {
    rows: number;
    setRows: React.Dispatch<React.SetStateAction<number>>,
    cols: number;
    setCols: React.Dispatch<React.SetStateAction<number>>,
    //gridState: boolean[][];
    gridState:GridStateType;
    setGridState: React.Dispatch<React.SetStateAction<GridStateType>>;

    startSim: boolean;
    setStartSim: React.Dispatch<React.SetStateAction<boolean>>;

    reset: boolean;
    setReset: React.Dispatch<React.SetStateAction<boolean>>;

    timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    updateGrid: () => void;
    ChangeInitialPattern: (option: string) => void;

    currentlyAliveCells: number;
    currentlyDeadCells: number;

    generation:number;
    setGeneration: React.Dispatch<React.SetStateAction<number>>;

    generationHistory:GridStateType[];
    setGenerationHistory: React.Dispatch<React.SetStateAction<GridStateType[]>>;
}

export interface GameProviderProps {
    children: React.ReactNode
}

export interface GridProps {
    grid: boolean[][];
    onCellClick: (position: { row: number, col: number }) => void
  }