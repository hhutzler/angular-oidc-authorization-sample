# Oidc Sample demonstrating  some of Keycloak/OIDC features

This project was generated with
- [Angular CLI](https://github.com/angular/angular-cli) version 13.2
- The OIDC reference library angular-auth-oidc-client  13.1 is used for keycloak communication

## In this sample we are demonstrating the following OIDC features:
-  Implements AuthInterceptor of angular-auth-oidc-client 13.1
-  Implements Autologin Feature from angular-auth-oidc-client 13.1
-  Implements Keycloak Fine-grained Authorization Feature 
-  Implements Keycloak User Self-Registration Feature

## Prerequisites
To runs this Angular Frontend code you need a ready configured keycloak ( see Part 1 ) and a quarkus server ( see Part 2) up and  running.
- For Keycloak Setup read [Part 1: Keycloak Setup ](https://www.helikube.de/part-1-setup-for-keycloak-authorization-sample )
- For Quarkus Setup read  [Part 2: Quarkus Setup ]( https://www.helikube.de/part-2-running-fine-grained-keycloak-authorization-feature-with-quarkus/)
- For Angular App details read [Part 3: OIDC authorization Setup  ](https://www.helikube.de/part-3-running-an-odic-angular-app-to-test-keycloak-authorization-feature)


## Development server
Initially Run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --module app` to generate a new component. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
