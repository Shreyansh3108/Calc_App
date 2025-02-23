let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value) && value !== '.') {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':   
        case 'c':   
            buffer = '0';
            runningTotal = 0;
            screen.innerText = buffer; 
            break;
        case '=':
        case 'Enter': 
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer)); 
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
        case 'Backspace': 
            if (buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':  
        case '−':  
        case '×':
        case '*': 
        case '÷':
        case '/': 
            handleMath(symbol);
            break;
        case '.': 
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
    }
}

function handleMath(symbol){
    if (buffer === '0'){
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0){
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    if (symbol === '*') symbol = '×';
    if (symbol === '/') symbol = '÷';
    if (symbol === '−') symbol = '-';
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer){
    if (previousOperator === '+'){
        runningTotal += floatBuffer;
    } else if (previousOperator === '-'){
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×'){
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷'){
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        if(event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText);
        }
    });

    document.addEventListener('keydown', function(event){
        const key = event.key;
        if (!isNaN(key) || key === '.') {
            buttonClick(key);
        } else if (key === 'Enter' || key === '=' || key === 'Backspace' || 
                   key === 'C' || key === 'c' || 
                   key === '+' || key === '-' || key === '*' || key === '/' ) {
            buttonClick(key);
        }
    });
}

init();
