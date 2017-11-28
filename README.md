# hybrid-grocery-api
A basic shopping NodeJS+Typescript backend application, with TypeORM entity framework integrated in the application.

# Steps to setup the project

1. clone repository 
2. run `npm i`
3. create an empty mysql database script `grocerydb`, edit `ormconfig.json` and change your database configuration (you can also change a database type, but don't forget to install specific database drivers)
4. run `npm start`
5. open `http://localhost:3000/api/catalogue` and you'll get an array of product catalogue.
6. use curl, postman or other tools to send http requests to test your typeorm-based API
or install google chrome's Allow-Control-Allow-Origin: * extension, `https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en` to get access to your front-end web/mobile application request.

## How to use CLI?

1. install `typeorm` globally: `npm i -g typeorm`
2. run `typeorm -h` to show list of available commands

## Running in Docker

To build docker image

1. docker `build -t hybrid-grocery-api` .

To run docker container

1. `docker run -t --rm -p 3000:3000 -v $(pwd):/app hybrid-grocery-api`

App should be now accessible from the browser level at localhost:3000
