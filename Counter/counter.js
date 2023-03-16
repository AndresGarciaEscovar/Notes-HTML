
// #############################################################################
// Constants and Variables
// #############################################################################


// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------


// String value constants.
const MAX_NUMBER = 99999999999999;
const MAX_NUMBER_STRING = "" + MAX_NUMBER;
const MAX_NUMBER_LENGTH = MAX_NUMBER_STRING.length;


// -----------------------------------------------------------------------------
// Variables
// -----------------------------------------------------------------------------


// Counter history.
let history = ["0", "0", "0"];
let counter = 0;


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
 * @return An integer with the numerical id of the history element. 
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
// Remove Functions
// -----------------------------------------------------------------------------


/**
 * Removes the leading zeros from the string.
 * 
 * @param elemValue Removes all the leading zeros from the string.
 *  
 * @return The string with the leading zeros removed.
*/
function removeZeros(elemValue)
{
    // Temporary string.
    let value = "";
    let removeZero = true;

    for(let i = 0; i < elemValue.length; i++)
    {
        // Check the first entry.
        if(i == 0 && elemValue[i] == "-")
        {
            value += "" + elemValue[i];
            continue;
        }
        
        // Check the rest of the string.
        removeZero = removeZero && elemValue[i] == "0";

        // If the number needs to be added.
        if(!removeZero) value += elemValue[i];
    }

    // Return zero if needed.
    if(value == "-" || value == "") return "0";

    return value;
}


// -----------------------------------------------------------------------------
// Set Functions
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
    let elemVal = removeZeros(element.value);

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
        history[elemNum] = parseInt(MAX_NUMBER_STRING);
        if(elemVal[0] == "-") history[elemNum] = - history[elemNum];
        element.value = history[elemNum];
        return;
    }

    // Update the counter.
    history[elemNum] = "" + parseInt(elemVal);
    element.value = history[elemNum];
    return;
}


// -----------------------------------------------------------------------------
// Update Functions
// -----------------------------------------------------------------------------

/**
 * Adds the given number to the counter, provided that the operation is valid 
 * and updates the counter label.
 * 
 * @param operation The operation that is being performed.
*/
function updateCounter(operation)
{ 
    // Auxiliary counter.
    let element = null;
    let number = 0;

    // Obtain the number.
    if(operation == "add" || operation == "subtract")
    {
        number = operation == "add"? 1 : -1;
    }
    else{
        
        if(operation == "add-custom")
        {
            element = document.getElementById("textarea-add");
        }
        else
        {
            element = document.getElementById("textarea-subtract");
        }
        
        number = parseInt(element.value);
        number = operation == "add-custom"? number : -number;
    }

    // Add to the counter and fix it.
    counter = counter + number;
    if (counter > MAX_NUMBER) counter = MAX_NUMBER;
    if (counter < -MAX_NUMBER) counter = -MAX_NUMBER;

    // Update the counter.
    element = document.getElementById("label-counter");
    element.innerHTML = counter;
}

/**
 * Resets the counter to zero or the custom value.
 * 
 * @param toZero Boolean flag that determines if the counter must be set to zero
 * or the custom value. It's 'true', if it must be set to zero; 'false',
 * otherwise.
*/
function updateReset(toZero)
{ 
    // Reset the counter.
    counter = parseInt(document.getElementById('textarea-reset').value);
    if(toZero) counter = 0;
    
    // Update the counter.
    element = document.getElementById("label-counter");
    element.innerHTML = counter;
}


// -----------------------------------------------------------------------------
// Save Functions
// -----------------------------------------------------------------------------


/**
 * Saves/deletes the selected save counter; the delete operation cannot be
 * undone.
 * 
 * @param toSave Boolean flag that determines if the counter must be saved or
 * the selected entry deleted. Deletions cannot be undone. It's 'true', if the 
 * counter must be saved; 'false', othersiwe.
*/
function save(toSave) 
{
    

    // If the counter must be saved.
    if(toSave)
    {

        return;
    }
    
    // State must be removed.
    return;
}