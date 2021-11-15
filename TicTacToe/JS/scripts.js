
function boardempty()
{
    empty = true
    for(i = 0; i < board.length; i++)
    {
        for(j = 0; j < board[i].length; j++) empty = empty && board[i][j] == -1;
    }
    console.log(empty)
}

function changeIcon(cell)
{
        // Block from more moves.
        cell.disabled = true;

        // Update player 1.
        if(player1)
        {
            cell.innerHTML = '<img src='  + images[0] + '/>';
            return;
        }
        cell.innerHTML = '<img src='  + images[1] + '/>';
}

function checkDraw()
{
    draw = true;
    for(i = 0; i < board.length && draw; i++)
    {
        for(j = 0; j < board[i].length && draw; j++) draw = draw && !(board[i][j] === emptyId);
    }
    return draw;
}

function checkWin()
{
    // Get the player number.
    player = player1? playerId[0] : playerId[1];

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
    // Toggle the sliders.
    if(firstTime)
    {
        firstTime = false;
        toggelSliders();
    }

    // Update the cell.
    var cell = document.getElementById(cellId);
    changeIcon(cell);

    // Update the move id.
    moveId = parseInt(cellId);
    updateBoard(moveId);

    // Check if somebody has won.
    win = checkWin();
    draw = checkDraw();
    if(win || draw)
    {
        disableAll();
        printEndMessage(win);
        if(win) updateScore();
        return;
    }

    // Change player.
    player1 = !player1;
}

function printEndMessage(win)
{
    mssg = document.getElementById("winLogo");

    // Display the win message.
    if(win)
    {
        winner = player1? " 1 " : " 2 ";
        mssg.innerHTML = "Player" + winner  + "Wins!";
        return;
    }
    mssg.innerHTML = "It's a draw!!";
}

function resetCounters()
{
    score = [0, 0];
    updateCounters();
}

function resetGame()
{
    // Reset the cells tags.
    for(i = 0; i < board.length * board.length; i++)
    {
        id = i.toString();
        cell = document.getElementById(id);
        cell.innerHTML = "";
        cell.disabled = false;
    }

    // Reset the board.
    for(i = 0 ; i < board.length; i++)
    {
        for(j = 0 ; j < board[i].length; j++) board[i][j] = emptyId;
    }

    // Clear the win message.
    mssg = document.getElementById("winLogo");
    mssg.innerHTML = "";

    // Reset the sliders and the flags.
    if(document.getElementById("checkbox1").disabled) toggelSliders()
    player1 = true;
    firstTime = true
}

function updateBoard(moveId)
{
    var coordinates = [Math.floor(moveId / 3), moveId % 3];
    board[coordinates[0]][coordinates[1]] = player1? playerId[0] : playerId[1];
}

function updateCounters()
{
    for(i = 0; i < 2; i++)
    {
        counter = i.toString();
        counter = document.getElementById("counter" + i);
        counter.innerHTML = score[i].toString();
    }
}

function updateScore()
{
    player1? score[0] += 1 : score[1] += 1;
    updateCounters();
}

function switchImage(sliderId)
{
    if(sliderId === "checkbox0")
    {
        checkbox = document.getElementById("checkbox1");
        checkbox.checked = !checkbox.checked;
    }
    else
    {
        checkbox = document.getElementById("checkbox0");
        checkbox.checked = !checkbox.checked;
    }

    imagesTmp = images[0];
    images[0] = images[1];
    images[1] = imagesTmp;
}

function toggelSliders()
{
    checkbox0 = document.getElementById("checkbox0");
    checkbox1 = document.getElementById("checkbox1");

    checkbox0.disabled = !checkbox0.disabled;
    checkbox1.disabled = !checkbox1.disabled;
}

var emptyId = -1
var board = [[emptyId, emptyId, emptyId], [emptyId, emptyId, emptyId], [emptyId, emptyId, emptyId]];
var images = ["./Images/icon1.png", "./Images/icon2.png"];
var player1 = true;
var playerId = [0, 1];
var score = [0, 0]
var firstTime = true





