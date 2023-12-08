import { send_data_to_tinybird, read_tinyb_config } from "./tinybird.js";
import { productsList } from "./products.js";
import { faker } from '@faker-js/faker';

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

function generateMessage(eventType, product) {
    return {
        datetime: formatDate(true),
        event: eventType,
        product: product,
    };
}

// Send a batch of messages to Tinybird
async function sendBatch(token, batch) {
    const batchString = batch.map(event => JSON.stringify(event)).join('\n');
    await send_data_to_tinybird('ecomm_events', token, batchString);
}

// Calculate and log the uploading rate
function logUploadRate(startTime, batchSent, totalSent, sample) {
    const currentTime = Date.now();
    const dt = (currentTime - startTime) / 1000; // Convert ms to seconds
    const rate = Math.round(batchSent / dt); // Messages per second
    console.log(`Uploading rate: ${rate} messages/second. ${totalSent} of ${sample}`);
}

// Function to simulate a user session
async function createUserSession(products, token) {
    const sessionEvents = [];
    const cart = [];
    const product = products[faker.number.int({ min: 0, max: products.length - 1 })].id;

    // Add view event
    sessionEvents.push(generateMessage('view', product));

    // Randomly decide if the product is added to the cart
    if (faker.datatype.boolean()) {
        sessionEvents.push(generateMessage('cart', product));
        cart.push(product);

        // Randomly decide if the user proceeds to checkout
        if (faker.datatype.boolean()) {
            sessionEvents.push(generateMessage('checkout', product));

            // Randomly decide if the purchase is completed or failed
            const saleEvent = faker.datatype.boolean() ? 'sale' : 'fail';
            sessionEvents.push(generateMessage(saleEvent, product));

            // Update inventory on successful sale
            if (saleEvent === 'sale') {
                const inventoryUpdates = cart.map(productInCart => {
                    const amount = faker.number.int({ min: -5, max: -1 });
                    return updateInventory(productInCart, amount, token);
                });

                // Wait for all inventory updates to complete
                await Promise.all(inventoryUpdates);
            }
        }
    }

    return sessionEvents
}

// Function to simulate inventory update
async function updateInventory(product, amount, token) {
    const inventoryUpdate = {
        datetime: formatDate(true),
        amount,
        product: product,
    };
    return await send_data_to_tinybird('inventory', token, JSON.stringify(inventoryUpdate));
}

export const generateInventoryData = async (token, products) => {
    products.forEach(async (product) => {
        const inventoryUpdate = {
            datetime: formatDate(true),
            amount: faker.number.int({ min: 5000, max: 10000 }),
            id: product.id,
        };
        console.log(`Sending inventory data to Tinybird: ${product.name}`)
        await send_data_to_tinybird('inventory', token, JSON.stringify(inventoryUpdate));
    });
}


// Main function to produce and send batch data
export const generateWebEventData = async (token, sample, repeat, batchSize, products) => {
    let startTime = Date.now();
    let totalSent = 0;
    let batchSent = 0;
    let batch = [];

    for (let r = 0; r < repeat; r++) {
        for (let i = 0; i < sample; i++) {
            const message = await createUserSession(products, token);

            batch.push(...message);

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

// const main = async () => {
//     try {
//         const token = await read_tinyb_config("./.tinyb");
//         console.log("Sending initial inventory data to Tinybird");
//         await generateInventoryData(token, productsList);
//         console.log("Inventory seeding complete");

//         console.log("Sending web events to Tinybird");
//         await generateWebEventData(token, 1000, 1, 3000, productsList);
//         console.log("Web events seeding complete")
//     } catch (error) {
//         console.error(error);
//     }
// };

// await main()