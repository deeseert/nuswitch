const readline = require('readline');
const { price } = require('./src/commands/price');
const { usage } = require('./src/commands/usage');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });


rl.on('line', (line) => {
    let plans;

    try {
        plans = JSON.parse(process.argv[2]);
    } catch (error) {
        console.log(`An error occurred: ${error}`);
    }

    const input = line.trim().split(' ');
    const command = input[0];
    const energyUsage = input[1];

    const supplierName = input[1];
    const planName = input[2];
    const monthlySpend = input[3];

    if (command === 'price') {
        const result = price(energyUsage, plans);

        return result.map(({ supplier, plan, totalCost }) => console.log(`${supplier},${plan},${totalCost}`));
    };

    if (command === 'usage') return console.log(usage(supplierName, planName, monthlySpend, plans));

    if (command === 'exit') return process.exit();

    console.log('Please, use "price", "usage", or "exit" command');

});
