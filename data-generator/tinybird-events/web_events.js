import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { send_data_to_tinybird, read_tinyb_config } from "./utils/tinybird.js";
import { faker } from '@faker-js/faker';

// Parse command line arguments using yargs
const argv = yargs(hideBin(process.argv))
    .option('sample', {
        alias: 's',
        describe: 'Number of samples to generate',
        type: 'number',
        default: 10000
    })
    .option('repeat', {
        alias: 'r',
        describe: 'Number of times to repeat the batch',
        type: 'number',
        default: 1
    })
    .option('batchSize', {
        alias: 'b',
        describe: 'Size of each batch',
        type: 'number',
        default: 500
    })
    .help()
    .alias('help', 'h')
    .argv;


const formatDate = (utc) => {
    const now = utc ? new Date() : new Date().toLocaleString('en-US', { timeZone: 'UTC' });
    // Formatting to 'YYYY-MM-DD HH:MM:SS'
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Generate a single message
function generateMessage(events, products) {
    return {
        datetime: formatDate(true),
        event: events[faker.number.int({ min: 0, max: events.length - 1 })],
        product: products[faker.number.int({ min: 0, max: products.length - 1 })],
    };
}

// Send a batch of messages to Tinybird
async function sendBatch(token, batch) {
    const batchString = batch.map(event => JSON.stringify(event)).join('\n');
    await send_data_to_tinybird('web_events', token, batchString);
}

// Calculate and log the uploading rate
function logUploadRate(startTime, batchSent, totalSent, sample) {
    const currentTime = Date.now();
    const dt = (currentTime - startTime) / 1000; // Convert ms to seconds
    const rate = Math.round(batchSent / dt); // Messages per second
    console.log(`Uploading rate: ${rate} messages/second. ${totalSent} of ${sample}`);
}

// Main function to produce and send batch data
const produceBatchData = async (token, sample, repeat, batchSize) => {
    let startTime = Date.now();
    let totalSent = 0;
    let batchSent = 0;
    let batch = [];

    const events = ['view', 'cart', 'sale'];
    const products = ['sZzx0cUDX98', '5d0cgAl5BTk', 'YY4YaHKh2jQ', 'p8Drpg_duLw', 'xFmXLq_KJxg', 'fSdBxY0NxVI', '6cHumpSxTvs', 'Zu7A1GCSjZE', 'Fg15LdqpWrs'];

    for (let r = 0; r < repeat; r++) {
        for (let i = 0; i < sample; i++) {
            const message = generateMessage(events, products);
            batch.push(message);

            if (batch.length === batchSize || i === sample - 1) {
                await sendBatch(token, batch);
                batchSent += batch.length;
                totalSent += batch.length;
                batch = []; // Reset batch after sending
                logUploadRate(startTime, batchSent, totalSent, sample);

                if ((Date.now() - startTime) / 1000 < 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 - (Date.now() - startTime)));
                }
                startTime = Date.now();
                batchSent = 0;
            }
        }
        console.log(`${sample} messages sent in batch ${r + 1}`);
    }
};

const main = async () => {
    try {
        console.log("Sending web events to Tinybird");
        const token = await read_tinyb_config("./.tinyb");
        await produceBatchData(token, argv.sample, argv.repeat, argv.batchSize);
    } catch (error) {
        console.error(error);
    }
};

await main();