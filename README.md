# SWAPI Profile Search
> She may not look like much, but she's got it where it counts, kid.

This is a React + Next.js web interface for the SWAPI api. Search for profile information on characters from around a faraway galaxy.

## Running the program
### Prerequisites
[node](https://nodejs.org/en/download/) must be installed.

In the fullstack-challenge folder, run:
```bash
npm install
```
to ensure that Next.js in available

### Running
Development server:

```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000).

## Running api unit tests
```bash
npm run test
```

## Code guide
components: react hook components

gateway: api used to interface with SWAPI

models: re-usable object creators and constants

pages: base pages

pages/api: Thin api routes to connect frontend to gateway

util: Utility functions for backend
