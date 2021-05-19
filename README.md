[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# Moleculer with express.js template project
This is a template project for building API service using [Moleculer](https://moleculer.services/) and express.js. It also uses PostgreSQL as database and Sequelize as ORM.

## Usage
Start the project with `npm run dev` command. 
In the terminal, try the following commands:
- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call user.test` - Call the `user.test` action.
- `call user.hello` - Call the `user.hello` action.

## Services
- **api**: API Gateway services
- **user**: Sample service with `test`, `hello`, and `user` actions.

## NPM scripts
- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
