import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { send_data_to_tinybird, read_tinyb_config } from "./utils/tinybird.js";

const products = [
    { category: 'accessories', id: '5d0cgAl5BTk', name: 'Embroidered Beanie', photo: 'photos/embroidered-beanie.png', price: 18 },
    { category: 'accessories', id: 'YY4YaHKh2jQ', name: 'Five Panel Tiny Love Cap', photo: 'photos/five-panel-tiny-love-cap.png', price: 20 },
    { category: 'accessories', id: 'p8Drpg_duLw', name: 'White Glossy Mug', photo: 'photos/white-glossy-mug.png', price: 13 },
    { category: 'accessories', id: 'sZzx0cUDX98', name: 'Stainless Steel Water Bottle', photo: 'photos/stainless-steel-water-bottle.png', price: 26 },
    { category: 'accessories', id: 'xFmXLq_KJxg', name: 'Sticker Sheet', photo: 'photos/sticker-sheet.png', price: 9 },
    { category: 'clothing', id: '6cHumpSxTvs', name: 'Baby One Piece', photo: 'photos/baby-one-piece.png', price: 19 },
    { category: 'clothing', id: 'Fg15LdqpWrs', name: 'Kids T-Shirt', photo: 'photos/kids-t-shirt.png', price: 20 },
    { category: 'clothing', id: 'Zu7A1GCSjZE', name: 'Tiny Love Unisex T-Shirt', photo: 'photos/tiny-love-unisex-t-shirt.png', price: 16 },
    { category: 'clothing', id: 'fSdBxY0NxVI', name: 'Unisex Sweatshirt', photo: 'photos/unisex-sweatshirt.png', price: 40 },
];

const argv = yargs(hideBin(process.argv))
    .option('count', {
        alias: 'c',
        describe: 'Number of products to send',
        type: 'number',
        default: products.length
    })
    .option('config', {
        alias: 'f',
        describe: 'Path to the Tinybird configuration file',
        type: 'string',
        default: './.tinyb'
    })
    .help()
    .alias('help', 'h')
    .argv;

// Function to get the Tinybird token
async function getToken(configPath) {
    return await read_tinyb_config(configPath);
}

// Function to send a single product to Tinybird
async function sendProduct(token, product) {
    await send_data_to_tinybird('products', token, product);
    console.log(`Sending product data to Tinybird: ${product.name}`);
}

// Function to send multiple products to Tinybird
async function sendProducts(token, productCount) {
    for (let i = 0; i < productCount; i++) {
        await sendProduct(token, products[i]);
    }
}

// Main function
const main = async () => {
    try {
        console.log("Sending products to Tinybird");
        const token = await getToken(argv.config);
        const productCount = Math.min(argv.count, products.length);

        await sendProducts(token, productCount);
        console.log("Initial seeding complete");

    } catch (error) {
        console.error(error);
    }
}

await main();
