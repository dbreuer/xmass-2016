# Xmass2016

![Xmass Progressive Web App](https://dbreuer.github.io/xmass-2016/assets/xmass-2016-angular-pwa.png)

This project was originally generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

**✨ Updated to Angular 19** - This project has been migrated from Angular 2 to Angular 19.

## Params

/:lang/:id

- [lang] Language options: en-GB, hu-HU
- [id] To name (mandatory) string (latin extended)

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

## Installation

```bash
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/guard/interface/enum/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploying to Github Pages

Run `npm run deploy` to deploy to Github Pages.

## Migration Notes (Angular 2 → Angular 19)

### Key Changes:

- **Angular CLI**: Updated from v1.0.0-beta.22-1 to v19.0.0
- **Configuration**: Migrated from `angular-cli.json` to `angular.json`
- **HTTP**: Replaced deprecated `HttpModule` with `HttpClient` (provideHttpClient)
- **RxJS**: Updated to v7.8.0, removed deprecated import paths
- **TypeScript**: Updated to v5.6.0 with modern ES2022 target
- **Polyfills**: Simplified - removed core-js dependencies (now built-in)
- **Linting**: Migrated from TSLint to ESLint
- **Zone.js**: Updated to v0.15.0

### Code Refactoring:

- Modernized TypeScript syntax (const, let, proper typing)
- Updated RxJS import statements
- Improved code formatting and consistency
- Added proper error handling

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
