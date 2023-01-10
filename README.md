<h1 align="center"></h1>

# Prerequisites

- [NodeJS](https://nodejs.org/en/) (use nvm to manage versions)
- [NPM](https://www.npmjs.com/get-npm)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Editor Setup

- [ESLint/Prettier](https://eslint.org/docs/user-guide/integrations#editors)

# Instructions

A REST api that powers a simple blog.

## User story

1. Users should be able to sign up and sign in. They should be able to pass a username and password.
1. Data is persisted data either in memory a persistent file storage [lowdb](https://github.com/typicode/lowdb))
1. Signed-in users should be able to create a new blog post. Blog posts should be, by default, not visible.
1. Signed-in users should be able to "publish" their blog post.
1. Signed-out users should be able to see all published blog posts.
1. Signed-in users should be able to leave comments on blog posts.

### Running the API

This app runs on [Express](https://expressjs.com/), but the necessary scripts from this application are all available via yarn:

| Command    | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `yarn dev` | starts a development server for the api with hot reloading |

Once you run `yarn dev`, the api will be running at `localhost:8000`.
