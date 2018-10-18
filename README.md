# Triangulum
- Heroku: https://osu-triangulum.herokuapp.com/
- Github: https://github.com/vollmerr/triangulum

[![CircleCI](https://circleci.com/gh/vollmerr/triangulum/tree/master.svg?style=svg)](https://circleci.com/gh/vollmerr/triangulum/tree/master)

## About
This project is the Triganulum Web Crawler. It is comprised of a react web UI and node API that crawls web pages in forked processes.

## Getting Started
### Install
From within the root folder, run `npm install`. This install both the server and client packages.

### Building
From within the root or client folder, run `npm run build`. This builds the client production code in the `/client/build` folder.

### Running Locally
An initial build is required before running the project (see above).

The quickest way to run the project is by using `npm run start` in the root folder.

For a better development experience / to run with hot reload enabled:

1. Start the API with `npm run start:dev` from within the `/server` folder.
2. In a new terminal, start the client with `npm run start` from within the `/client` folder.

Saving changes in either the client or server will now be reflected without reloading or restarting.
