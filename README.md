# Notes App 
#### MongoDB | Node.js | Express.js 

A simple note taking web application with a basic authentication system. Uses `express` for backend routing pipeline/middleware and `ejs` templates to serve psuedo-static html pages from the `/views` directory. 

Checkout the [demo hosted on Azure](https://takenotes.azurewebsites.net).

#### Index
-    [Architechture and Implementation](#architechture-and-implementation)
-    [Run Locally](#run-locally)
     -    [Setup a MongoDB Database](#setup-a-mongodb-database)
     -    [Setup Up Local Environment](#setup-local-environment)
     -    [Start the Server](#start-the-server)
-    [Contributing](#contributing)

# Architechture and Implementation
In a nutshell, the code is based on the MVC architechture, with the following quirks:

1. An `express` http server acts as the controller and routes the requests through the middleware stack.
2. `Mongoose` is used to create `mongoDB` models/schema for the database.
3. Authentication system uses JWTs for login adhereing to the basic OAuth0 protocols.
4. Frontend is written is pure vanilla JS and uses `fetch API` to make backend requests.  

# Run Locally
To run locally, first clone this repo:
```
git clone https://github.com/sravanth-chebrolu/take-notes
```

## Setup a MongoDB Database
Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) locally and tart your own local MongoDB server OR create a free 500 MB cluster on [MongoDB Atlas](https://www.mongodb.com/try), either way once you're done creating the database, note the server URI.

In case you're running locally, the URI will generally be `localhost:27017`.

## Setup Local Environment
Create a `.env` file at the root directory in the following format, replace the fields with their respective values, where `MONGO_URI` is the URI to your local/cloud database, and `PORT` is where the express server will run.
> .env
```
MONGO_URI='<YOUR_MONGO_URI>'
PORT=<YOUR_SERVER_PORT> 
```

## Start the Server

After finishing the setup, run the following command to start a local server

```
npm start
```

# Contributing
In case you come across this repo as a beginner or you simply want to contribute, feel free to leave an issue/pull request. 

The author will be pleased to see look at your ideas.
