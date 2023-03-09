# Chat

The main purpose of the project is to write the project on TypeScript, practice technology WebSocket and use bundler Webpack. The project itself is a chat with echo server, which responds to each message with the same message. An additional feature is that the server can show your location.

What is used:

- Programming languages: HTML, CSS, TypeScript;
- Bundler: Webpack;
- Preprocessor: SCSS;
- Libraries: Babel, ESLint, Husky;

To clone repository

```shell
git clone https://github.com/User-960/Chat.git
```

To install packages, use the command

```shell
npm install
```

---

\* Before start project you need to make file `.env` in root of project and copy from file `.env.example` variables with meanings in new file. Or you can write your own meanings for variables in file `.env`

## Commands

### Launching a development server

```shell
npm run start
```

### Building a project without optimization

```shell
npm run build-dev
```

### Building a project with optimization

```shell
npm run build-prod
```

### Cleaning up the dist folder

```shell
npm run clear
```

### Checking the src folder for an error according to the set of rules

```shell
npm run eslint
```
