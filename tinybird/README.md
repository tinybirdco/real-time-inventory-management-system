# Data Project

Data project based on this other one [https://github.com/tinybirdco/demo-ux-person](https://github.com/tinybirdco/demo-ux-person) so feel free to check that one.

## Working with the Tinybird CLI

To start working with data projects as if they were software projects, let's install the Tinybird CLI in a virtual environment.
Check the [CLI documentation](https://docs.tinybird.co/cli.html) for other installation options and troubleshooting.

```bash
virtualenv -p python3 .e
. .e/bin/activate
pip install tinybird-cli
tb auth
```

Go to your workspace, copy a token with admin rights and paste it. A new `.tinyb` file will be created.  

## Project description

```bash
├── datasources
│   ├── carts.datasource
│   ├── fixtures
│   │   └── prods.ndjson
│   ├── prods.datasource
│   ├── sales.datasource
│   └── views.datasource
├── endpoints
│   └── ranking.pipe
├── pipes
└── tests
```

In the `/datasources` folder:
- sales.datasource: where we'll be ingesting sales event data from the frontend or the data generator.
- prods.datasource: descriptions of the products sold
- views.datasource: where we will record visits to products
- carts.datasource: to store number of carts to which a product was added

In the `/fixtures` folder:
- prods.ndjson

In the `/endpoints` folder:
- ranking: a pipe to rank the products based on category and desired ranking.

Note:
Typically, in big projects, we split the .pipe files across two folders: /pipes and /endpoints
- `/pipes` where we store the pipes ending in a datasource, that is, [materialized views](https://guides.tinybird.co/guide/materialized-views)
- `/endpoints` for the pipes that end in API endpoints.  

Also you can use `/tests` to define some static and dynamic tests for your endpoints.

## Pushing the data project to your Tinybird workspace

Push the data project —datasources, pipes and fixtures— to your workspace

```bash
tb push --fixtures
```

You will see something like this:

```bash
(.e) ➜  data-project git:(master) ✗ tb push --fixtures
** Processing ./datasources/prods.datasource
** Processing ./datasources/views.datasource
** Processing ./datasources/sales.datasource
** Processing ./datasources/carts.datasource
** Processing ./endpoints/ranking.pipe
** Building dependencies
** Running sales 
** Token append_token not found, creating one
** 'sales' created
** Running prods 
** 'prods' created
** Running carts 
** Token append_token found, adding permissions
** 'carts' created
** Running views 
** Token append_token found, adding permissions
** 'views' created
** Running ranking 
** => Test endpoint at https://api.tinybird.co/v0/pipes/ranking.json
** Token read_ranking_token not found, creating one
** => Test endpoint with:
** $ curl https://api.tinybird.co/v0/pipes/ranking.json?token=<read_ranking_token>
** 'ranking' created
** Pushing fixtures
** Warning: datasources/fixtures/sales.ndjson file not found
** Checking ./datasources/prods.datasource (appending 1.3 kb)
**  OK
** Warning: datasources/fixtures/carts.ndjson file not found
** Warning: datasources/fixtures/views.ndjson file not found
```
