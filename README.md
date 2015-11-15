# hexabi

## Intro

This is a game I'm building, complete work in progress, using a bunch of new stuff.

It has in it...

* React for the rendering
* Redux for the data flow
* Redux-router for the routing
* Express for the Server
* GraphQL for the Api
* PostgreSQL for the DB
* Bookshelf & knex for the Models

I've mashed it together from a lot of demo's and brute force. And there are few hacks.
But at the time of writing it's bang up to date with the latest versions of everything.

## Getting Started
Install node
Install postgreSQL Server
connect to it, and set it up with the tables
You can find the raw SQL in api/tables/*
Create a server-config.js from the example-server-config.js which connects to your db

I will create DB scripts for this at some point...

### Initial set up
Standard set up

__git clone this repo__
__npm install__

### To run + dev
__npm start__  

This will create the server and client bundles for you, then run the node server.
When changes are made it will automatically rebuild the server + re-run it. Or
automatically rebuild the client-bundle. No hot reloading - I hate it.

When you are done, kill the process, and the server will remain running.  
__npm stop__  
To finally kill it.

### dev Server
You might want server logs. I've not sorted the scripts for this properly yet,
I just use __npm run-script watch__, and __npm run-script serve__ in a separate tab.

## TODO
So much stuff.

* Sort out authentication
* Sort out an SSL
* CRUD for users
* CRUD for games
* DB scripts for knex
* Spin off at this point as boilerplate example

* BUILD GAME...
