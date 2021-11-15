
function changeIcon(cell)
{
        // Block from more moves.
        cell.disabled = true;

        // Update player 1.
        if(player1[0])
        {
            cell.innerHTML = '<img src='  + player1[1] + '/>';
            return;
        }

        // Update player 2.
        if(player1[1] == images[0])
        {
            cell.innerHTML = '<img src='  + images[1] + '/>';
            return;
        }
        cell.innerHTML = '<img src='  + images[0] + '/>';
}

function makeMove(cellId)
{
    // Update the cell.
    var cell = document.getElementById(cellId);
    changeIcon(cell);

    // Update the move id.
    moveId = parseInt(cellId)
    updateBoard(moveId)
    player1[0] = !player1[0];
}

function updateBoard(moveId)
{
    // Get the coordinates.
    var coordinates = [moveId % 3, Math.floor(moveId / 3)];
    board[coordinates[0]][coordinates[1]] = player1[0]? "P1" : "P2"
}


var board = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
var images = ["./Images/icon1.png", "./Images/icon2.png"]
var player1 = [true, images[0]]