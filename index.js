const fs = require('node:fs');
const path = require('node:path');

// Open input and get row count
const stdin = process.openStdin();

console.log('How many rows should be generated?');

stdin.addListener('data', function (rawInput) {
    const input = rawInput.toString();

    if (isNaN(input)) {
        return console.log('Invalid number.');
    }

    const rowsFloat = parseFloat(input);
    if (!Number.isInteger(rowsFloat) || !Number.isSafeInteger(rowsFloat) || rowsFloat <= 0) {
        return console.log('Invalid number.');
    }

    stdin.pause();
    calculate(parseInt(input));
});

function calculate(rows) {
    // Create output file
    const fileName = `output-${Date.now()}.txt`;

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
