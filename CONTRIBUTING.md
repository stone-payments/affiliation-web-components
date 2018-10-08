
## Contributing ##

Please read this doc before start to use this repo. We have a set of guidelines that should be followed.

Feel free to propose changes to this document using a pull request.

* Code patterns

### Available Scripts ###

Local Development enviroment
```
npm start (component-name)
```
Build for production
```
npm run build
```
Run unit testing
```
npm test
```

### Git Workflow ###

We use [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/).

### Branching
- ```feature/feature-name``` to new features.
- ```fix/bug-name``` to fix bugs.
- ```improvement/improvement-name``` to improvement code.

### Commit messages ###

- Use emoji at the beginning of each message. It help us to identify what's the purpose for each commit.

| Code.                 | Emoji               | Description                                     |
|-----------------------|---------------------|-------------------------------------------------|
| `:art:`               | :art:               | when improving the format/structure of the code |
| `:racehorse:`         | :racehorse:         | when improving performance                      |
| `:memo:`              | :memo:              | when writing docs                               |
| `:bug:`               | :bug:               | when fixing a bug                               |
| `:fire:`              | :fire:              | when removing code or files                     |
| `:green_heart:`       | :green_heart:       | when work with CI                               |
| `:white_check_mark:`  | :white_check_mark:  | when work with tests                            |
| `:lock:`              | :lock:              | when dealing with security                      |
| `:arrow_up:`          | :arrow_up:          | when upgrading dependencies                     |
| `:arrow_down:`        | :arrow_down:        | when downgrading dependencies                   |
| `:shirt:`             | :shirt:             | when removing linter warnings                   |
| `:bulb:`              | :bulb:              | new idea                                        |
| `:construction:`      | :construction:      | work in progress                                |
| `:heavy_plus_sign:`   | :heavy_plus_sign:   | when adding feature                             |
| `:heavy_minus_sign:`  | :heavy_minus_sign:  | when removing feature                           |
| `:facepunch:`         | :facepunch:         | when resolving conflicts                        |
| `:hammer:`            | :hammer:            | when changing configuration files               |


Commit exemple:
```
git commit -m ":arrow_up: Update Carthage dependencies"
```

### Pull Requests ###

All Pull Request must be made to the `devolop branch`.

Before opening a Pull Request, verify if all unit tests passed,
we have CI tools to run tests, if it fails [you will be notified](https://www.youtube.com/watch?v=mmLRTVYgEq4).


### Releasing a new version ###

Currently, the release proccess requires you to:
1. Open a release branch, following gitflow branching conventions (`release/vx.x.x`), from `develop branch`.
2. Run the `npm run version-bump` command.
3. Update the version in the main `package.json`.
4. Commit.
5. Create a tag (`git tag -a vx.x.x`)
6. Push a tag.
7. Push the release branch.
8. Create pull request against the `develop branch` and the `master branch`.
