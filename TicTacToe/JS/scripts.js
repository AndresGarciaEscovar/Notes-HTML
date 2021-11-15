
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

function checkWin()
{
    // Get the player number.
    player = player1[0]? playerId[0] : playerId[1];

    // Flags.
    winDiagonalOne = true;
    winDiagonalTwo = true;
    winHorizontal = false;
    winVertical = false;

    for(i = 0; i < board.length && (!winHorizontal || !winVertical); i++)
    {
        // Check horizontals and verticals.
        winHorTemp = true;
        winVerTemp = true;
        for(j = 0; j < board[i].length && (winHorTemp || winVerTemp); j++)
        {
            winHorTemp = winHorTemp && board[i][j] === player;
            winVerTemp = winVerTemp && board[j][i] === player;
        }
        winHorizontal = winHorizontal || winHorTemp;
        winVertical = winVertical || winVerTemp;

        // Check diagonals.
        winDiagonalOne = winDiagonalOne && board[i][i] === player;
        winDiagonalTwo = winDiagonalTwo && board[2-i][i] === player;
    }

    return winDiagonalOne || winDiagonalTwo || winHorizontal || winVertical;
}

function disableAll()
{
    for(i = 0; i < board.length * board.length; i++)
    {
        id = i.toString();
        cell = document.getElementById(id);
        cell.disabled = true;
    }
}

function makeMove(cellId)
{
    // Update the cell.
    var cell = document.getElementById(cellId);
    changeIcon(cell);

    // Update the move id.
    moveId = parseInt(cellId);
    updateBoard(moveId);

    // Check if somebody has won.
    win = checkWin();
    if(win)
    {
        disableAll();
        printWinMessage();
        updateScore()
    }

    // Change player.
    player1[0] = !player1[0];
}

function printWinMessage()
{
    // Clear the win message.
    mssg = document.getElementById("winLogo")
    winner = player1[0]? " 1 " : " 2 ";
    mssg.innerHTML = "Player" + winner  + "Wins!"
}

function resetCounters()
{
    score = [0, 0]
    updateCounters()
}

function resetGame()
{
    // Reset the cells tags.
    for(i = 0; i < board.length * board.length; i++)
    {
        id = i.toString();
        cell = document.getElementById(id);
        cell.innerHTML = ".";
        cell.disabled = false;
    }

    // Reset the board.
    for(i = 0 ; i < board.length; i++)
    {
        for(j = 0 ; j < board[i].length; j++) board[i][j] = ".";
    }

    // Clear the win message.
    mssg = document.getElementById("winLogo")
    mssg.innerHTML = ""

    // Reset the player.
    player1[0] = true
}

function updateBoard(moveId)
{
    var coordinates = [Math.floor(moveId / 3), moveId % 3];
    board[coordinates[0]][coordinates[1]] = player1[0]? playerId[0] : playerId[1];
}

function updateCounters()
{
    for(i = 0; i < 2; i++)
    {
        counter = i.toString()
        counter = document.getElementById("counter" + i)
        counter.innerHTML = score[i].toString()
    }
}

function updateScore()
{
    player1[0]? score[0] += 1 : score[1] += 1;
    updateCounters()
}

var board = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
var images = ["./Images/icon1.png", "./Images/icon2.png"];
var player1 = [true, images[0]];
var playerId = [0, 1];
var score = [0, 0]