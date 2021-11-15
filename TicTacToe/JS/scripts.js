function myFunction(my_id)
{
    // Get the element.
    var element = document.getElementById(my_id);
    element.disabled = true;

    // Turn the id into an integer
    var column = parseInt(my_id) % 3;
    var row = Math.floor(parseInt(my_id) / 3);

    var coord = [row, column];

    entries[row][column] = "O";
    console.log(...entries)

}

var entries = [["A", "A", "A"], ["B", "B", "B"], ["C", "C", "C"]];