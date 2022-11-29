# Sagely Publication Interview Question Viewer

A template mono-repo full-stack Typescript project that includes a debugging environemnt for VSCode, and dockerized production output.

## Description

This was made with the intention of emulating a production-ready app that could be deployed to a cloud PaaS using containers. The data provided via the CSV is used to seed
a data base which then provides a REST api to the frontend. The frontend will display the publications,
and demonstrates the usage of filters, pagination, and common friendly UX patterns when viewing data like usage of iconography,
glances, and minimal "routing".

## Architecture

The production cluster uses 3 docker containers:

* `sagely-backend`: This runs the Node Typescript Express server, which access the data base to provide a REST API. It uses a controller<>data layer interaction to seperate the storage interface, potentally allowing for a simpler swap of storage solutions in the future.
* `sagely-frontend`: This runs an nginx server which serves a Typescript React SPA, and a proxy to proxy backend requests to the `sagely-backend` container. It uses Material UI to save development time by using proven user-friendly components.
* `sagely-backend-db`: This is a Mongo Database which serves as the NoSQL datastore for the `sagely-backend` service. The `sagely-backend` will seed the DB upon startup from a provided csv file, but is also designed to mimic a potential storage solution for the type of structured document data provided for this exercise.

## Commands

### Running

Running requires [docker for desktop](https://docs.docker.com/get-docker/) to be locally installed.

Then run `docker-compose up`.

Access the site at [localhost:3001](http://localhost:3001)

### Development

From the `/packages/server` directory:

* `npm run watch` to run the backend express server.
* `npm run test` to test just the backend server.
* `docker-compose-up` to run the backend mongo db server.

From the `/packages/frontend` directory:

* `npm run watch` to run the frontend.
* `npm run test` to test just the frontend.
