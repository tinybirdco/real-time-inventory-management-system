<p>
  <a href="https://www.tinybird.co/join-our-slack-community"><img alt="Slack Status" src="https://img.shields.io/badge/slack-chat-1FCC83?style=flat&logo=slack"></a>
</p>

# Real-time inventory management demo

This repo contains an ecommerce demo to show a very basic example of real time inventory management using Tinybird to ingest data, transform it, and publish endpoints. The demo is built using Svelte and Tailwind CSS.

It is deliberatedly simple to be quickly showable in a demo.

You can visit the deployed apps here:

- [Svelte ecommerce](https://ecommerce-svelte-rho.vercel.app/)

## Requirements

- Node.js < v. 18
- Python < v. 3.8

## Getting Started

1. Setup your Tinybird account

Click this button to deploy the data project to Tinybird 👇

[![Deploy to Tinybird](https://cdn.tinybird.co/button)](https://ui.tinybird.co/workspaces/new?name=signatures_poc)

Follow the guided process, and your Tinybird workspace is now ready to start receiving events.

2. Setup this repository locally

```bash
git clone https://github.com/tinybirdco/signatures-POC.git
cd signatures-POC
```

3. Install dependencies

```bash
npm install
```

4. Setup Tinybird CLI

The install script above will automatically install and configure the `tinybird-cli` for this project.

Choose your region: 1 for `us-east`, 2 for `eu`. A new `.tinyb` file will be created.tb

Go to [https://ui.tinybird.co/tokens](https://ui.tinybird.co/tokens) and copy the token with admin rights.

⚠️Warning! The Admin token, the one you copied following this guide, is your admin token. Don't share it or publish it in your application. You can manage your tokens via API or using the Auth Tokens section in the UI. More detailed info at [Auth Tokens management](https://www.tinybird.co/docs/api-reference/token-api.html)

This script will also push the data project to your Tinybird workspace.

5. Start generating data!

In the terminal, run the following command:

```bash
npm run seed
```

Go to your [Tinybird workspace](https://ui.tinybird.co) and check the data is flowing.

6. Copy the environment variables to .env

Locally, be sure to paste the admin token from Step 3 into the `.env` file.

7. Run the Dashboard locally

```bash
npm run dev
```

8. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Data

The data used in this demo is stored in the `data` directory.

### License

This project is licensed under the MIT License.

## Contributors

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -am 'Add your feature'`
4. Push the changes to your branch: `git push origin feature/your-feature-name`
5. Open a pull request on GitHub

## Feedback and Support

If you have any questions, feedback, or need support, please [open an issue](https://github.com/tinybirdco/real-time-inventory-management-system/issues/new).

### Need help?

&bull; [Community Slack](https://www.tinybird.co/join-our-slack-community) &bull; [Tinybird Docs](https://docs.tinybird.co/) &bull;

## Authors

- [Joe Karlsson](https://github.com/joekarlsson)
