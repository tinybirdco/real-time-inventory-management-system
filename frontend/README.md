# Ecommerce-svelte

## Create the .env file

In this folder, `/ecommerce-svelte/demo-ecomm-svelte`, create a .env file with the following structure:

```bash
VITE_TB_READ_TOKEN=<Your ranking_read_token>
VITE_TB_APPEND_TOKEN=<Your append_token>
VITE_TB_HOST=<api.tinybird.co for eu | us-east.api.tinybird.co for us-east>
```

## Run the app locally

After running `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## User guide

Check the /about page to see the steps to ingest data from the Data Generator.

## Roadmap

Check the /todo page to see some improvement ideas. Feel free to contribute.
