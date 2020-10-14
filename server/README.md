# Express Server Starter

## Architecture 
This starter follows the 3 layer architecture ([explained](https://softwareontheroad.com/ideal-nodejs-project-structure/)):
 - Controller
 - Service Layer
 - Data Access Layer

And additionally follows pub/sub architecture, where services emit events and handlers catch them.

## Customization
### API

### Dependency Injection (DI)
DI is available with `typedi` ([docs](https://www.npmjs.com/package/typedi)). However, this may cause runtime errors at runtime instead of compile time.

DI is available as an augmentation to the `loader` pattern, so that results don't need to be passed in arrays through promises.

### Configuration and Secrets
The best way to store secrets is with the `.env` file. It should never be committed, and is already included in the gitignore.

### Decorators

### Jobs and Tasks
Instead of relying on `setTimeout` et al, persistent tasks and jobs are available with `agenda`/`agendash`

### Loaders
Loaders are how we separate concerns and modularize the major components of a project. It's where all the wiring for a particular library/module is done

Some loaders do not follow the `AbstractLoader` pattern. The logger for example needs to be available before the loading process has even begun. For this reason, the song and dance of loading and awaiting is unnecessary.

### Logs

### Models

### Services

### Strings

### Subscribers

### Types

### Miscellaneous
 - `@folder` import intellisense: edit the paths in tsconfig.json


### TODO
 - generate tsconfig.json
 - jobs
 - decorators
 - services
 - subscribers
 - types
 - testing
 - Admin dashboard
  - status monitor (cpu, ram, load avg, resp time, rq per sec, status code graph, failed requests, highlighted log output)
 - packages
  - fakerjs
  - jest/mocha
  - just
  - feathers/hapi/restify/koa
  - pino
  - logging-library
  - node-cron
  - bull
  - agenda
  - axios
  - got
  - fetch
  - mailgun/nodemailer/emailjs
  - typedi
  - knex/sequelize/mongoose
  - commanderjs
  - upash
  - bluebird
  - micro/seneca
  - sparkly
  - conf
  - ora
  - storyboard (logging ui)
  - stackman
  - leakage
  - rate-limiter-flexible
  - apicache
  - inversify
