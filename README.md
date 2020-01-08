# Webjet Coding Challenge

## Setup instructions

- Clone project
- Install server packages `yarn install`
- Install client packages `cd client && yarn install`
- Copy .env.example file to .env and change value of access token
- Test server `yarn test:server`
- Test client `yarn test:client`
- Run application locally `yarn dev`. This will open up localhost:3000 in your browser

## Application structure

- React frontend is in client folder and Node backend is in the server folder.
- Application is started from server/server.js
- In development mode 2 servers are started - 1. on port 3000 for frontend and 2. on port 5000 for backend
- In production the frontend will be served from static build assets in client/build folder

### Server design

- app.js initializes the server with routes
- Routes are handled by the controllers in api folder. In this application there is only one controller api/movies.js
- Controller uses the model model/movie.js to process the request
- Model uses services services/filmworld.js & services/cinemaworld.js to fetch data from webjet endpoints
- The datasource (webjet apis) are injected into the model as dependencies
- The webjet endpoints are executed simultaneously and waits with a timeout of 4 until both responses are recieved
- The model combines both the responses and send the final response to client

### Client design

- Client is built on top of Create react app boilerplate
- Its seperated in to stateful containers and functional components
- The client send reqeust to backend to fetch all movies when homepage is called
- Since the server is built with 4 sec timeout(can be changed), if both cinemaworld and filmworld endpoints don't send response, then client will recieve failure response and the movie list will be empty. Refresh page to try the webjet endpoints again. If atleast 1 endpoint sends valid response, then movie list table has data.
- Click on the details button against each movie in the list to view the cheapest price. Again, this will only have actual cheapest price if both endpoints respond. If one of the endpoints didn't respond, then the other price is considered as cheapest. Refresh page to query again.
