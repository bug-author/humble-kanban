Angular app is split into modules. Each module is a directory with a module definition file and a set of components, services, directives, pipes, etc. Some modules are lazy loaded.

# Modules

## App module

The app module is the root module of the application. It is defined in `app.module.ts` file. It contains the root component, which is `AppComponent`. It also contains the router configuration.

## Core module

The core module is defined in `core.module.ts` file. Currently it is a placeholder for home module, which is lazy loaded. In the future it may contain services, directives, pipes, etc. that are used throughout the application, but currently these services are provided for the root module.

## Shared module

The shared module is defined in `shared.module.ts` file. It contains components that are commonly used throught application. It will be imported in every module that needs access to these components.

- Do not import the shared module in the core module.
- Do not declare singleton services in the shared module. Instead, provide them in the root/core module.

## Auth module

The auth module is defined in `auth.module.ts` file. It contains components that are used for authentication. It is lazy loaded after entering `/auth` route.
