# weatherapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Have node v18 or higher previously installed.

Run command `npm install` in project root. Wait modules instalation.

Run `npm run start` for a dev server on project root folder. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Development Server With Docker Compose

Run command `docker compose up` and navigate to `http://localhost:4200/` or `http://172.20.0.2:4200/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Test Realizados

The following tests were performed on the application

- WeatherService
- should be created
- SearchComponent
- should inject WeatherService correctly
- should create the component
- FavoriteService
- should be created
- HistoryService
- should be created
- FavoritesComponent
- should inject FavoriteService correctly
- should create the component
- HistoryComponent
- should create the component
- should inject HistoryService correctly

### Integration management with WeatherAPI and optimizations made.

For integration with WeatherAPI, 3 services were built to divide the responsibilities of each feature, `rxjs` methods were also used to filter unnecessary information from the API response. Observables, Signals, Map were used to optimize data management. Lazy Loading was added to each component to optimize the application load. Internationalization i18n for multilanguage was added. Errors were handled with a global interceptor apart from local component error controls.

The following tests were performed on the application

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
