# Graphql server

A graphql server's built from https://graphql.org/graphql-js/graphql-http/

## Features

- get animations endpoints
- upload endpoint

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_URL`

`CLIENT_URL`

`ECS_SERVICE`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_REGION`

`AWS_BUCKET_NAME`

## Run Locally

Clone the project

```bash
  git clone https://github.com/anhnh27/lottie-graphql.git
```

Go to the project directory

```bash
  cd lottie-graphql
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

## Tech Stack

- Nodejs
- GraphQL
- Express
- MongoDB

* The server provides graphlq endpoint using graphql-http in combination with express.
* MongoDB and AWS ECS for scalability are using for scalability purpose.

## CICD

The intergration and deployment are automated using github actions, server will be distributed to AWS ecosystem.

- Docker
- AWS ECR
- AWS ECS fargate
- Load balancer
- Cloudfront, Route53, ACM
