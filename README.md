# Quickdraw Server Starter

## Architecture 
This starter follows the 3 layer architecture ([explained](https://softwareontheroad.com/ideal-nodejs-project-structure/)):
 - Controller
 - Service Layer
 - Data Access Layer

And additionally follows pub/sub architecture, where services emit events and handlers catch them.

## Development & Customization

### Environment
Copy this example into your `.env` at the root of the project.
```python
HOST=0.0.0.0
SSL_PORT=8443
SSL_PASS=mypassword
PORT=8080

DB_HOST=
DB_USER=
DB_PASS=

MAIL_HOST=
MAIL_USER=
MAIL_PASS=

JWT_SECRET=

AGENDA_CONCURRENCY=20
AGENDA_POOL_TIME=one minute
AGENDA_MONGO_URL=localhost:27018
AGENDA_DB_COLLECTION=agendaJobs
AGENDA_USER=admin
AGENDA_PASS=pass

BODY_PARSE_SIZE_LIMIT=50mb

API_PREFIX=/api

COMPRESION=false
CORS=true
HTTP=false

LOG_LEVEL_DEV=silly
LOG_LEVEL_PROD=info
LOG_PATH=logs
```
### API

### Dependency Injection (DI)
DI is available with `typedi` ([docs](https://www.npmjs.com/package/typedi)). However, this may cause runtime errors at runtime instead of compile time.

DI is available as an augmentation to the `loader` pattern, so that results don't need to be passed in arrays through promises.

### Configuration and Secrets
The best way to store secrets is with the `.env` file. It should never be committed, and is already included in the gitignore.

### Decorators

### Events
Events tie together the loaders and services through the subscribers. A subscriber notifies the service when its event has been emitted, and forwards data to be used in the business logic. A subscriber may digest some data for the service. 

This part of the architecture is useful for handling requests that don't need fancy persistence or priorities, like authentication.

### Jobs and Tasks
Feature rich job libs are available (bull, agenda, etc) for use. One would use this for events that can happen asynchronously without a user waiting on the other end, such as sending welcome emails.

### Loaders
Loaders are how we separate concerns and modularize the major components of a project. It's where all the wiring for a particular library/module is done.

Some loaders do not follow the `AbstractLoader` pattern. The logger for example needs to be available before the loading process has even begun. For this reason, the song and dance of loading and awaiting is unnecessary.

### Logs
You can customize the logs by checking out the logger loaders and `.env`. 

### Models

### Services


### Strings
The strings folder structure intends to make translation scalable, and to bring out as many hardcoded strings as possible.

### Subscribers

### Types
For convenience during development, `injectionAliases.ts` is where the proper types corresponding to the active loaders are maintained. This has to be done manually, though, or you can just use `Any` for dependencies.

### Miscellaneous
 - `@folder` import intellisense: edit the paths in tsconfig.json, and `@types` is reserved, but `@localtypes` is available.
 - Routes and middlewares are automatically exported from `@api/`. You can prevent individual export by changing the filetype (like `.ts.deprecated`), which is `.ts` by default.

### Install
 - Mongodb