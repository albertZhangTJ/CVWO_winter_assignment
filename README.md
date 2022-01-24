# CVWO_winter_assignment

This is the CVWO winter assignment for ZHANG TONGJUN (A0245152M).

Since I had no prior experience with frontend developing before this project, the frontend part is based on the provided CVWO smaple react app. I have also relied heavily on StackOverflow during the construction of the frontend of this project.

The project was somewhat different from described in the previously uploaded description file.

The backend is implemented using Golang, operating on http://localhost:8080.

The frontend is implemented using Javascript, Typescript, and React, operating on http://localhost:3000.

## build

On Ubuntu:

backend:
````
cd backend && go build
````

## Deployment

On Ubuntu:

Load database into mysql:
````
sudo service start mysql
mysql -u username -p db_name < db/database_setup.sql
````

Start backend:
````
./backend/backend
````

Start frontend:
````
cd frontend && yarn start
````


## Licenses

For privacy concerns, reuse and reproduction of any of the contents in this project __IS STRICTLY PROHIBITTED BEFORE JAN-27-2022 00:00 GMT+8__, after which MIT License applies.
