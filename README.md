# Template TS Express Server

A template mono-repo full-stack Typescript project that includes a debugging environemnt for VSCode, and dockerized production output.

## Commands

### Development

From the `/packages/server` directory:

* `npm run watch` to run the backend express server.
* `npm run test` to test just the backend server.
* `docker-compose-up` to run the backend mongo db server.

From the `/packages/frontend` directory:

* `npm run watch` to run the frontend.
* `npm run test` to test just the frontend.

### Running

`docker-compose up`

* Will build a production build docker container cluster and start all of it.
