const fs = require('node:fs');
const path = require('node:path');
const { program } = require('commander');

// Set up program option flags
program.option('-r, --rows <rows>', 'how many rows to calculate');
program.parse();
const options = program.opts();

// Handle input/flags and calculate
if (options.rows) {
    const isValid = validateInput(options.rows);

    if (isValid) calculate(options.rows);
} else {
    // Open input and get row count
    const stdin = process.openStdin();

    console.log('How many rows should be generated?');

    stdin.addListener('data', function (rawInput) {
        const input = rawInput.toString();

        const isValid = validateInput(input);

        if (isValid) {
            stdin.pause();
            calculate(parseInt(input));
        }
    });
}

// Validate row number input
function validateInput(input) {
    if (isNaN(input)) {
        console.log('Invalid number.');
        return false;
    }

    const rowsFloat = parseFloat(input);
    if (!Number.isInteger(rowsFloat) || !Number.isSafeInteger(rowsFloat) || rowsFloat <= 0) {
        console.log('Invalid number.');
        return false;
    }

    return true;
}

// Calculate Pascal's Triangle
function calculate(rows) {
    // Create output file
    const fileName = `pascals-triangle-output-${Date.now()}.txt`;

    fs.writeFileSync(fileName, `Pascal's Triangle (${rows} rows)\n`);

    // Calculate
    let lastRow = [];

    for (var j = 0; j < rows; j++) {
        console.log(`Calculating row ${i + 1 || 1}...`);

        let newRow = new Array(lastRow.length + 1);

        for (var i = 0; i < newRow.length; i++) {
            if (i == 0 || i == newRow.length - 1) {
                newRow[i] = 1;
                continue;
            }

            newRow[i] = lastRow[i - 1] + lastRow[i];
        }

        // Add current row to output file
        fs.appendFileSync(fileName, `\n${newRow.join(' ')}`);

        lastRow = newRow;
    }

    console.log('Done!');
}
