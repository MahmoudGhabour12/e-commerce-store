# ECommerceStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

- First clone this project.
- Second use `yarn` to download dependencies.
- Run `ng serve` or `yarn start` for a dev server. Navigate to `http://localhost:4200/`.

## Detailed about this project

It contains simple ui for login page and have roles for each user that logged in and products lists with crud operations.

- I've used (https://fakestoreapi.com) to get api for products and categories.
  - admin role have authorization to add new products, update product and delete products.
  - user role have authorization to see products depends on selected category.

## For login

- Username: admin , Password : admin ==> for admin.
- Username: user , Password : user ==> for user.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
I applied the test on the login component.
