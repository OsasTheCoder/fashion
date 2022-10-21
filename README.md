# fashion

Fashion is a RESTful API service for a Fashion management app

# Documentation

A detailed documentation of the api can be found here: [API Documentation](https://documenter.getpostman.com/view/24008676/2s84DoR37r)
**Run Project Locally**

- Clone the project
- cd into the project's folder and run npm install to install dependencies
- Create a .env file and check env.sample folder for all environment keys name

- check the init.sql file for creating the tables
- Run npm run dev to start the server

# HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods:

- POST Create a resource
- GET Get a resource or list of resources
- PATCH updates a resource or list of resources
- DELETE deletes a resource or list of resources
- For POST, the body of your request must be a JSON payload.

# HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- 200 OK Successful request
- 400 Bad Request There was a problem with the request
- 500 Server Error Server error
