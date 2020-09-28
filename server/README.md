# Express Server Starter

## Architecture 
This starter follows the 3 layer architecture ([explained](https://softwareontheroad.com/ideal-nodejs-project-structure/)):
 - Controller
 - Service Layer
 - Data Access Layer

And additionally follows pub/sub architecture, where services emit events and handlers catch them.

## Dependency Injection (DI)
DI is available with `typedi` ([docs](https://www.npmjs.com/package/typedi)). However, this may cause runtime errors at runtime instead of compile time.

## Jobs and Tasks
Instead of relying on `setTimeout` et al, persistent tasks and jobs are available with `agenda`/`agendash`.sm:

## Configuration and Secrets
The best way to store secrets is with the `.env` file. It should never be committed, and is already included in the gitignore.