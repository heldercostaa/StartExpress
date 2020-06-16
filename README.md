# Start Express

A basic starting project using node, express and jest.

## Setup

Install dependencies using `yarn` (or `npm`):

```bash
$ cd ./StartExpress
$ yarn        # npm install
$ yarn start  # npm start
```

## Usage

Import the requests in Insomnia using the button bellow or use another HTTP request sender.

<a href="https://insomnia.rest/run/?label=StartExpress&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fheldercostaa%2FExpressCrud%2Fmaster%2F.insomnia%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

### Request examples

```http
// Create new repository and return it
POST /repositories HTTP/1.1
Content-Type: application/json

{
  "title": "Start Express",
  "url": "https://github.com/heldercostaa/StartExpress",
  "techs": ["Node", "Express"]
}

// Filter repositories by url
GET /repositories?url=heldercostaa HTTP/1.1

// Edit repository title according to the id on the route params and techs on body
PUT /repositories/:uuid HTTP/1.1
Content-Type: application/json

{
  "techs": ["Node", "Express", "Jest"]
}

// Remove repository according to the id on route params
DELETE /projects/:uuid HTTP/1.1

// Like repository specified by id
POST /repositories/:uuid/like HTTP/1.1
Content-Type: application/json
```

## Technologies

This project uses:

- Node
- Express
- Jest

## Test

To execute al tests, run:

```bash
$ yarn test # npm test
```
