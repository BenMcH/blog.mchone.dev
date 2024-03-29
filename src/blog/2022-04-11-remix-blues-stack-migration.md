---
title: Remix Indie to Blues Stack Migration
description: What does it take to migrate from Remix Indie to Blues Stack? This migration guide will help you understand the steps involved in migrating your databse to Postgres and deploy it to Fly.io
author: ben-mchone
authorName: Ben McHone
date: '2022-04-11T00:00:00'
hero: '/images/1200x627 - Darksvg.svg'
excerpt: What does it take to migrate from Remix Indie to Blues Stack? This migration guide will help you understand the steps involved in migrating your databse to Postgres and deploy it to Fly.io
tags: post
---

## Remix Stacks

[Remix Stacks](https://remix.run/docs/stacks) are a recently added feature to the `create-remix` CLI. They allow opinionated development stacks to be created and shared, allowing developers to rapidly build and deploy applications adhering to pre-determined design patterns. The Remix team provides 3 stacks out of the box:

* [Blues](https://github.com/remix-run/blues-stack) - a long-running node process that is deployed to Fly.io and backed by a postgres database.
* [Indie](https://github.com/remix-run/indie-stack) - a long-running node process that is deployed to Fly.io and backed by a sqlite database.
* [Grunge](https://github.com/remix-run/grunge-stack) - a serverless application that is deployed to AWS Lambda and backed by DynamoDB.

Those just starting with Remix often start with the Indie stack, as it is easy to get up and running and requires no extra steps to run a database locally on our computer. It is also common that after few days or weeks of development, the developer will want to migrate to the Blues stack for any number of reasons, one of the main reasons being that Postgres tends to be more performant than SQLite for larger applications. This leads us to the purpose of this blog post, which will explain how to migrate from the Indie stack to the Blues stack in an existing Remix application.

## Blues Stack Migration

Luckily for us, the migration from the Indie stack's concepts to the Blues stack's concepts is a straight-forward process and revolves entirely around our database. We will focus on this migration in two waves. In the first wave, we will update our local development environment to utilize postgresql. In the second wave, we will update our deployment processes to now utilize postgres in our deployed environments.

## Development Environment Migration

Our first step to migration is to configure [prisma](https://prisma.io) to use postgres as our database provider. Open up `prisma/schema.prisma` and replace the provider with `postgresql`.

Your datasource block in prisma should now look like this:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Great! Now prisma is configured to use postgres.

Next, we need to setup our local postgres database using docker so that we have a place to store data locally. To do this, we need to add a file in the root of our project called `docker-compose.yml`. This will allow us to run postgres locally in a container. Paste these lines into the file:

```
version: "3.7"
services:
  postgres:
    image: postgres:latest
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

To finish up the docker setup, we need to add a script to the package.json file within the scripts section.

```json
"scripts": {
  ...otherScripts,
  "docker": "docker-compose up -d",
  ...restOfScripts
}
```

Finally, run `npm run docker` to start up the postgres docker container, ready to receive connections for our local development environment.

We're very close to being able to run our local development environment once again. We just need to change the `.env` file to point to our local postgres database instead of our sqlite database the we originally used as part of the Indie stack. To do this, open up the `.env` file and replace the `DATABASE_URL` with `postgres://postgres:postgres@localhost:5432/postgres`

A bare-bones Indie-to-Blues stack .env file should look similar to this, assuming no other changes have been made to the `.env` file:

```
DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"
SESSION_SECRET="<a random string of characters>"
```

Now we have done most of the setup required to move prisma over to postgres, but we need to do one more important thing; We need to generate new migrations that are compatible with the new database, postgres.

The easiest method to restarting with new migrations is to delete the folder `prisma/migrations` and re-run `npm run setup`. This removes all of the SQLite migration files that were previously generated and gives you the opportunity to generate new ones. You will be prompted for a new name for the migration. This can be named anything you'd like, but I chose to name this `postgres_migration` so that it is easier to remember well into the future. 

At this point, you have successfully converted over your development environment to the Blues stack. Great work! Now may be a good time to get up, stretch, and get some coffee. We have just a few steps left to migrate our deployed application, but we're almost there!

### Deployment Migration

Our first change to our deployment process will be updating our Dockerfile to exclude the sqlite specific commands. Open up your `Dockerfile` and remove a couple of pieces of text.

```dockerfile
# Remove sqlite3 from the apt-get installation
RUN apt-get update && apt-get install -y openssl

# Remove the sqlite3 environment variable line that looks like this:
ENV DATABASE_URL=file:/data/sqlite.db

# Remove the following line, which sets up a shortcut to the sqlite command line, which we will no longer be using
RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli
```

Next, we need to add one step to our deployment github actions workflow. Open up the `.github/workflows/deploy.yml` file and add the following step to the `cypress` workflow, right before the `Setup Database` step:

```yaml
      - name: 🐳 Docker compose
        # the sleep is just there to give time for postgres to get started
        run: docker-compose up -d && sleep 3
        env:
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/postgres"
```

Finally, because we started off with the Indie stack, which does not provision any postgresql databases, we need to complete a couple of steps with Fly.io's `flyctl` to create our databases for each environment. Open your terminal and run the following commands, replacing `app-name` with your apps name in Fly.io:

```sh
fly postgres create --name app-name-db
fly postgres attach --postgres-app app-name-db --app app-name
```

Repeat for each environment you have deployed to Fly.io. By default, the Indie and Blues stacks automatically provision deployment to both a staging and production environment, meaning you would typically run these commands twice.


## Conclusion

Believe it or not, we're all done with the Blues-ification of our Indie stack Remix application and we're ready to commit our changes and push to github, if we haven't already! Now on our next deployment, we'll be using our postgres database in Fly.io to store our application's data.

An important piece to an application migration that I will not cover in this article is the migration of your application's existing data. If you've previously deployed your Indie stack application and stored data, such as user accounts, in your SQLite database, you will need to migrate that data to your postgres database or recreate the data.
