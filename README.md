# Notes App 
#### MongoDB | Node.js | Express.js 

A simple note taking web application with a basic authentication system.

# Architechture and Implementation
Express.js Controllers interact with Mongoose Models when an API is hit, and the response from the server is injected into the View engine(ejs) and is sent as HTML to the client.
1. Uses Express.js for routing and creating a http server.
2. Making use of the basic CRUD operations at the core to modify the notes.
3. Authentication/Login system uses JWTs and follows the basic OAuth0 protocols. 

Checkout the [demo hosted on Azure](https://takenotes.azurewebsites.net).
