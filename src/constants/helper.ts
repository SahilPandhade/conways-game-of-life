export const createInitialPattern = (option:string,rows:number,cols:number) =>{
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(false));
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
            [1, 5], [1, 6], [2, 5], [2, 6],// block
            [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], // left part
            [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], // right part
            [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], // left part
            [35, 3], [35, 4], [36, 3], [36, 4] // right part
        ];
    
        gliderGun.forEach(([x, y]) => {
            const adjustedX = centerOfCols + x - 18;  // Adjusted for centering
            const adjustedY = centerOfRows + y - 6;    // Adjusted for centering
    
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
    return newGrid
}
