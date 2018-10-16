# Affiliation-web-components Contributing guide

Contributions are always welcome :sparkling_heart:, no matter how large or small. Before contributing read the following guidelines.

- [Issue Reporting Guidelines](#Issue-Reporting-Guidelines)
- [Pull Request Guidelines](#Pull-Request-Guidelines)
- [Development Setup](#Development-Setup)
- [Code of conduct(Under Construction :construction:)](https://github.com/stone-payments/affiliation-web-components/wiki/Code-of-conduct).

# Issue Reporting Guidelines

Always use [new issues](https://github.com/stone-payments/affiliation-web-components/issues) to create new issues.

# Pull Request Guidelines

- We use [git-flow](https://git-scm.com/docs/gitworkflows) to the base workflow in the project.
- The master branch is a snapshot of our latest unstable version. All development should be targeted at specific branches.
- Do not submit PRs to a branch `master`. :x:
- Check out a topic branch from the relevant branch, e.g. `dev`, and merge back against that branch.
- Make sure npm test passes (see [Development Setup](#Development-Setup)).
- To new feature:
    - Tell the reason for the new feature, ideally you should open an issue with the suggestion of the feature before starting to work on it.
    - Remember, add an accompanying test case.
- To fixing a bug:
    - If you are resolving a special issue, add (fix #xxx[,#xxx]) (#xxx is the issue id) in your PR title for a better release log, e.g. [affiliation-web-component-merchant-addresses] update date modeling (fix #3899).
    - Provide a detailed description of the bug in the PR. Live demo preferred.
    - Add appropriate test coverage if applicable.

# Development Setup

For development, you will need the [Node.js](http://nodejs.org/) in version 8 or above.

After cloning the repo, run:

```javascript
  npm install
```

## Committing Changes

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit.

## Used NPM scripts

```javascript
  //Starting a component, you need to pass a component scope (component name).
  npm start <scope>

  //Run lint on the project.
  npm run lint

  //Run the tests with DOM.*
  npm test

  //Run the unity tests*
  npm run spec

  //Run the build process on the project
  npm run build
```

** We divide our tests in `.test`, tests with a browser, they need a DOM to run and `.spec`, unity tests,  they don't need a DOM to run.
