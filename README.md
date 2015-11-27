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

## Structure
server.js: express server creation & configuration.
 * api/ - defining the api
   * database.js: knex config to connect to db
   * models: bookshelfjs models attached each represents a table in the DB
   * mutations: graphQL mutation definitions
   * query: graphQL query definitions
   * schema: GraphQL schema (basically graphQL's version of the models above
   * tables: PostgreSQL queries, just for me - could be used to generate DB in future
 * app/ - front end app
   * index.html: index file for rendering into
   * index.js: entry point on client side
   * actions: redux action declarations
   * components: react components
   * containers: react containers - attached to redux-router via @connect
   * content: probably temporary, contains static declarations
   * middleware: run between actions + reducers allowing async operations to be fired (including all api calls)
   * reducers: redux reducers - essentially the stores representing the data in the app
   * routes: contains redux-router declarations, getRoutes in particular
   * services: async services for any need
   * stores: store creation utils for server and client
   * styles: global style declarations for importing into any component's css module
   * utils: helper methods re-used across the app
 * server/ - express server
   * config: config for server
   * endpoints: endpoint handlers for express routes
   * middleware: middleware called pre-endpoint handler
   * utils: helper methods re-used across server
  
##
Example flows

### First visit
 * user hits domain
 * redux-router decides what route the url represents, and therefore what Containers are needed
 * Containers are checked for required actions
 * All actions are fired
 * First action is always initSession, contributed by the Server Container (server side only)
 * Actions fired go through middleware, including api + auth calls
 * Upon all actions completing content is rendered + returned to user.
 * index.js takes over and loads page.
 * On transition to any page, the next page's required actions are fired to populate it

### Login
 * Login action is fired
 * On auth async complete Login success action is fired
 * session store is updated, change emitted
 * Client container wrapper is listening to this.props.isLoggedIn
 * Container decides to navigate
 

## TODO
So much stuff.

* Sort out authentication
* Sort out an SSL
* CRUD for users
* CRUD for games
* DB scripts for knex
* Spin off at this point as boilerplate example

* BUILD GAME...
