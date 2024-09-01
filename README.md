## Description

Vehicle Valuation and Loan Application API

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)


## Features

- Create and retrieve vehicle valuations by VIN.
- Manage loan applications (create, update status, and retrieve).
- Well-structured code with proper error handling.
- Integration with external VIN lookup service.
- Detailed API documentation using Swagger.

## Technologies Used

- **Node.js** with **NestJS** framework.
- **TypeScript** for type-safe JavaScript development.
- **TypeORM** as the ORM for database interactions.
- **SQLite3 (In-memory)** as the database for local development.
- **Swagger** for API documentation.
- **Jest** for unit testing.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository:**

   ```bash
   #clone repo
   $ git clone https://github.com/jobson-okosun/Autocheck-API.git

   #change directory
   $ cd Autocheck-API
   ```
   

2. **Install dependencies:**

   ```bash
   $ npm install

   # or

   $ yarn install
   ```


2. **Compile and run the project** 

  ```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev
  ```

## Run tests

```bash
# unit tests
$ npm run test
```

### Prerequisites

If application starts successfully, then the database has already been seeded. ( valuations, vehicle and loan )


### API documentation

```bash
$ http://localhost:3000/api
```