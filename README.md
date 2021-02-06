# **Express Groomer Back End API**

#### Backend [`Github Repo`](https://github.com/Lambda-School-Labs/Express_Groomer-TeamB-BE) located [here](https://github.com/Lambda-School-Labs/Express_Groomer-TeamB-BE).


#### Back End [`Deployed Site`](https://express-groomer-b-api.herokuapp.com/) located [here](https://express-groomer-b-api.herokuapp.com/).

<br>

## Features
For more extensive information on the state of the application as a whole and its features please see the README for the front end repository located [here on GitHub](https://github.com/Lambda-School-Labs/Express_Groomer-TeamB-FE).

<br>

## Tech Stack 

- Node.js
- Express
- Knex
- PostgreSQL
- Docker
- AWS S3
- Multer

<br>

 ## Back End Documentation

See the [Backend Documentation Generated in Postman](https://documenter.getpostman.com/view/10971957/TVzViwNL) for details on the interacting with the backend of the project. 

You can import the entire Postman Collection via this button: 


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f34416839ea9be987e33)

**`NOTE:`**  neither this documentation nor the Postman collection include the authentication headers with the Bearer Token needed to access protected routes.  

Within the repo you will find almost all API calls being made via functions within the APIContext.js file (src/state/contexts/APIContext.js). Within that file you will see the function which generates the authheaders which hold the Bearer Token recieved from Okta.

For this reason, currently routes have been tested in Postman in a local environment by first removing the authrequired middleware.  If you choose to do so, do NOT forget to restore the middleware to any routes you are testing.

<br>

## Environment Variables

```
OKTA_URL_ISSUER=...
OKTA_CLIENT_ID=...
DATABASE_URL=...
PORT=8000
CORS_ORIGIN=...
AWS_BUCKET_NAME=...
AWS_ID=...
AWS_SECRET=...
```
<br>

---

## Getting Started
<br>

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

<br>


### Environment Variables (Original Setup Instructions)

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See `.env` file for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
   - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
   - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
   - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
     - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
   - make note of the port, username and password you use to setup the database.
   - Connect your client to the server manually using the values previously mentioned
   - You will need to create a database manually using a client.
   - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
   - Sign up for a free `Tiney Turtle` plan
   - copy the URL to the DATABASE_URL .env variable
   - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- confirm correct env variables in your `.env` file.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

<br>

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

<br>

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
