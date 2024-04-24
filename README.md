# Theme Park Ride Information Server

## Introduction

This project is designed to provide additional information about rides in theme parks through this source :

```https://gist.githubusercontent.com/Jurollet/12470631232f30a81ace67add5bf839a/raw/3c514d9618b98e58a870bb2f0f01fbe3221e03f5/rides.json``` 

It offers a way to display the appropiate information about various rides, using their names, height restriction, speed, etc.

Created using Typescript, NodeJS, Express and Jest for unit testing

## Prerequisites

Before running the project, make sure you have the following prerequisites installed with the latest version:

- Node.js
- npm (Node Package Manager)

## Structure of the Project

The project structure is organized as follows:

- `index.ts`: The main entry point of the server.
- `controller/`: Responsible f/fetchRidesr handling incoming requests and orchestrating data flow.
- `routes/`: Contains route handlers for different API endpoints.
- `helper/`: Stores utility functions aiding in code reuse and maintainability.
- `utils/`: Utility functions used within the project.
- `__test__/`: Test files for unit testing.

## APIs
```GET```

**/fetchRides** : Get all the rides

**/getRideStatus/:rideName** : Get the status of the ride {rideName}

**/getParkForHeight/:height** : Get the park with the most amount of rides available for {height}

**/getMostThrillingRides** : Get the highest ride and the fastest ride

## Installation

To install and run this project, follow these steps:

1. Clone the repository to your local machine: ```git clone ```

2. Navigate to the project directory: ```cd ThemeparkAPI```

3. Install dependencies with npm: ```npm install ```

## Run the Project

To run the server, execute the following command: ```npm start```

This will start the server on: ```http://localhost:8080/```

## Tests

To execute the test file, execute the following command: 

```npm test```
