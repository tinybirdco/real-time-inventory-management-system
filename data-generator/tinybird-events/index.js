import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { read_tinyb_config } from "./utils/tinybird.js";
import { generateWebEventData, generateInventoryData } from "./utils/web_events.js";
import { generateProductData } from "./utils/products.js";
import { productsList } from "./utils/products.js";

// Define the CLI flags using yargs
const argv = yargs(hideBin(process.argv))
    .option('init', {
        alias: 'i',
        describe: 'Initialize the Tinybird data project by seeding all necessary data',
        type: 'boolean',
        default: false
    })
    .option('seedProducts', {
        alias: 'p',
        describe: 'Seed product data',
        type: 'boolean',
        default: false
    })
    .option('seedInventory', {
        alias: 'i',
        describe: 'Seed inventory data',
        type: 'boolean',
        default: false
    })
    .option('seedWebEvents', {
        alias: 'we',
        describe: 'Seed web event data',
        type: 'boolean',
        default: false
    })
    .option('sample', {
        alias: 's',
        describe: 'Number of samples to generate for web events',
        type: 'number',
        default: 10000
    })
    .option('repeat', {
        alias: 'r',
        describe: 'Number of times to repeat the web event data generation',
        type: 'number',
        default: 1
    })
    .option('batchSize', {
        alias: 'b',
        describe: 'Size of each batch for web event data generation',
        type: 'number',
        default: 500
    })
    .option('config', {
        alias: 'c',
        describe: 'Path to the Tinybird configuration file',
        type: 'string',
        default: './.tinyb'
    })
    .help()
    .alias('help', 'h')
    .argv;


// node index.js --seedProducts --seedInventory --seedWebEvents
const main = async () => {
    try {
        const token = await read_tinyb_config(argv.config);

        if (argv.init) {
            console.log("Starting initial data seed");
            console.log("Seeding products data to Tinybird");
            await generateProductData(token, productsList);
            console.log("Seeding products complete");

            console.log("Starting initial inventory seeding");
            await generateInventoryData(token, productsList);
            console.log("Seeding inventory complete");

            console.log("Starting web event seeding");
            await generateWebEventData(token, argv.sample, argv.repeat, argv.batchSize, productsList);
            console.log("Seeding complete.");
        }

        if (argv.seedProducts) {
            console.log("Seeding products data to Tinybird");
            await generateProductData(token, productsList);
            console.log("Seeding products complete");
        }

        if (argv.seedInventory) {
            console.log("Starting inventory seeding");
            await generateInventoryData(token, productsList);
            console.log("Seeding inventory complete");
        }

        if (argv.seedWebEvents) {
            console.log("Starting web event seeding");
            await generateWebEventData(token, argv.sample, argv.repeat, argv.batchSize, productsList);
            console.log("Seeding complete.");
        }

    } catch (error) {
        console.error(error);
    }
};

await main();
