const tablSudoku = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '1', '2', '.', '3', '4', '5', '6', '7'],
    ['.', '3', '4', '5', '.', '6', '1', '8', '2'],
    ['.', '.', '1', '.', '5', '8', '2', '.', '6'],
    ['.', '.', '8', '6', '.', '.', '.', '.', '1'],
    ['.', '2', '.', '.', '.', '7', '.', '5', '.'],
    ['.', '.', '3', '7', '.', '5', '.', '2', '8'],
    ['.', '8', '.', '.', '6', '.', '7', '.', '.'],
    ['2', '.', '7', '.', '8', '3', '6', '1', '5'],
];

// Détermine si la valeur de la case est bonne
function isValid(board, hori, vert, val) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(hori / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(vert / 3) + i % 3;
        if (board[hori][i] == val || board[i][vert] == val || board[m][n] == val) {
          return false;
        }
    }
    return true;
}

// Passe en revue toute les cases du plateau
function sudokuAnswer(board) {
    for (let hori = 0; hori < 9; hori++) {
        for (let vert = 0; vert < 9; vert++) {
            if (board[hori][vert] == '.') {
                for (let val = 1; val <= 9; val++) {
                    if (isValid(board, hori, vert, val)) {
                        board[hori][vert] = `${val}`;
                    if (sudokuAnswer(board)) {
                        return true;
                    } else {
                        board[hori][vert] = '.';
                    }
                }
            }
            return false;
            }
        }
    }
    return true;
}

sudokuAnswer(tablSudoku);
console.log(tablSudoku);





