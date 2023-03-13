
// #############################################################################
// Constants and Variables
// #############################################################################

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const MAX_NUMBER_LENGTH = 14;
const MAX_NUMBER_STRING = "99999999999999";

// -----------------------------------------------------------------------------
// Variables
// -----------------------------------------------------------------------------

// Counter history.
let history = ["0", "0", "0"];

// #############################################################################
// Functions
// #############################################################################


// -----------------------------------------------------------------------------
// Get Functions
// -----------------------------------------------------------------------------

/**
 * Gets the integer that corresponds to the element id of the 
 *
 * @param elemId The id of the element for which to get the numerical value.
 * 
 * @returns An integer with the numerical id of the history element. 
 */
function getHistoryIndex(elemId)
{
    // Get the id of the container to update.
    if(elemId == "textarea-add")
    {
        return 0;
    }
    else if(elemId == "textarea-subtract")
    {
        return 1;
    }

    return 2;
}


// -----------------------------------------------------------------------------
// Set Functions.
// -----------------------------------------------------------------------------


/**
 * Updates the given custom textbox.
 * 
 * @param elemId The id of the element to be set.
*/
function setCounter(elemId)
{
    // Auxiliary variables.
    let valid = true;

    // Get the html element.
    let element = document.getElementById(elemId);
    let elemVal = element.value;

    // Get the history index.
    let elemNum = getHistoryIndex(elemId);

    // Update the history.
    if (elemVal == "" || elemVal == "-0")
    {
        history[elemNum] = "0";
        element.value = history[elemNum];
        return;
    }

    // All the values must be numbers.
    for(let i = 0; valid && i < elemVal.length; i++)
    {
        if(i == 0 && elemNum == 2)
        {
            valid = elemVal[i] == "-";
            valid = valid || ('0' <= elemVal[i] && elemVal[i] <= '9');
            continue;
        }
        valid = valid && ('0' <= elemVal[i] && elemVal[i] <= '9');
    }

    // Value is not valid.
    if(!valid)
    {
        element.value = "" + parseInt(history[elemNum]);
        return;
    }

    // Get the length of the string.
    numberLength = elemVal[0] == "-"? elemVal.length - 1 : elemVal.length;

    // Verify the length of the string.
    if(numberLength > MAX_NUMBER_LENGTH)
    {
        history[elemNum] = "999 " + parseInt(elemVal);
        element.value = history[elemNum];    
    }

    history[elemNum] = "" + parseInt(elemVal);
    element.value = history[elemNum];
    return;
}