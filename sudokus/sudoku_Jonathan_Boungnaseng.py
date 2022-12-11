grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 0, 6, 1, 8, 2],
    [0, 0, 1, 0, 5, 8, 2, 0, 6],
    [0, 0, 8, 6, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 7, 0, 5, 0],
    [0, 0, 3, 7, 0, 5, 0, 2, 8],
    [0, 8, 0, 0, 6, 0, 7, 0, 0],
    [2, 0, 7, 0, 8, 3, 6, 1, 5]
    ]

#Affiche la grille
def print_grid(grid):
    for x in range(len(grid)):
        if x % 3 == 0 and x != 0:
            print("- - - - - - - - - - - - - ")

        for y in range(len(grid[0])):
            if y % 3 == 0 and y != 0:
                print(" | ", end="")

            if y == 8:
                print(grid[x][y])
            else:
                print(str(grid[x][y]) + " ", end="")


# Vérifie si la position est valide dans la grille
def valid(grid, pos, num):
    for x in range(len(grid)):
        if grid[pos[0]][x] == num and pos[1] != x:
            return False

    for x in range(len(grid)):
        if grid[x][pos[1]] == num and pos[0] != x:
            return False

    cell_x = pos[1] // 3
    cell_y = pos[0] // 3

    for x in range(cell_y*3, cell_y*3 + 3):
        for y in range(cell_x * 3, cell_x*3 + 3):
            if grid[x][y] == num and (x,y) != pos:
                return False

    return True


# Trouve une grille vide
def find_empty(grid):
    for x in range(len(grid)):
        for y in range(len(grid[0])):
            if grid[x][y] == 0:
                return (x, y)

    return None


# Resoudre le sudoku
def solve(grid):
    empty = find_empty(grid)
    if not empty:
        return True
    else:
        row, col = empty
    # x = ligne, y = colonne
    for x in range(1,10):
        if valid(grid, (row, col), x):
            grid[row][col] = x

            if solve(grid):
                return True

            grid[row][col] = 0

    return False

if solve(grid):
    print("Voici la solution : \n")
    solve(grid)
    print_grid(grid)
else:
    print("Résolution impossible.")
