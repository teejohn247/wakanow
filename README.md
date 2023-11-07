# Assessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

To run the backend Navigate to `https://github.com/teejohn247/Assessment-bk`. run `yarn install` then `yarn start` to run the backend

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project Flow

1. User creates an account. The first account is automatically an admin account
2. User logs in to a dashboard
3. Admin adds new user 
4. User gets an email notification containing email and password
5. Admin approves new user and automatically becomes the admin to the new user
6. When new user is approved, new user can add another user and circle continues
7. Admin can only edit and delete user accounts they administer over


