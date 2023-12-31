import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { send_data_to_tinybird, read_tinyb_config } from "./tinybird.js";

export const productsList = [
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

// Function to send a single product to Tinybird
async function sendProduct(token, product) {
    await send_data_to_tinybird('products', token, JSON.stringify(product));
    console.log(`Sending product data to Tinybird: ${product.name}`);
}

// Function to send multiple products to Tinybird
export async function generateProductData(token, products) {
    for (let i = 0; i < products.length - 1; i++) {
        await sendProduct(token, products[i]);
    }
}

// // Main function
// const main = async () => {
//     try {

//         console.log("Starting initial product seeding");
//         const token = await read_tinyb_config(argv.config);

//         await generateProductData(token, productsList);
//         console.log("Product seeding complete");

//     } catch (error) {
//         console.error(error);
//     }
// }

// await main();
