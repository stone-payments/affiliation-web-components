# Customer Web Components  

The project was thought to be a library of reusable web components, made with native web components,
these components are primarily focused on means of payment.
The customer web components are maintained by [StoneCo](https://www.stone.com.br/) 


## Project  
  
* Project decisions 

  [Lerna](https://lernajs.io/)

  [Karma](https://karma-runner.github.io/2.0/index.html)

  [EsLint](https://eslint.org/), rules extends [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

  [RollUp](https://rollupjs.org/guide/en)
  
### Structure  
  
* Monorepo  
 
 * Folder structure
 
	```
	sling-web/
	├── packages/
	│   ├── sling-web-component
	│	  ├── dist/  (Folder generated using npm run build command)
	│	  │   ├── cjs/
	│	  │   │    ├── component/
	│	  │   │    │    └── Component.js
	│	  │   │    └── index.js
	│	  │   └── es/
	│	  │        ├── component/
	│	  │        │    └── Component.js
	│	  │        └── index.js
	│	  ├── src/
	│	  │   ├── assets/
	│	  │   │    ├── Component.css
	│	  │   │    └── host.css
	│	  │   ├── component/
	│	  │   │	   ├── Component.js
	│	  │   │	   └──  Component.test.js
	│	  │   └── index.js
	│	  ├── .gitignore
	│	  ├── .npmignore
	│	  ├── README.md
	│	  ├── index.html
	│	  ├── index.js
	│	  └──  package.json
	└── scripts/
	```

### Use  
#### Node 
	v8.10.0
	
#### Install
```npm install```
  
#### Start  
```npm start```
 
#### Test  
```npm test```

```FILES_PATTERN='packages/*/src/sling-web-my-component/*.test.js' npm test```

## Components  
  
* Project decisions 

  [Polymer](https://www.polymer-project.org/)
  
  [LitElement](https://github.com/Polymer/lit-element)
  
### Framework  
  
  [SlingElement](./packages/sling-framework/src/framework/SlingElement.js)
  
  [SlingBusinessElement](./packages/sling-framework/src/framework/SlingBusinessElement.js)  
  
Emerald
  
## SDK  
#### [Customer JS sdk](https://github.com/stone-payments/customer-js-sdk)

### Redux in project
  
![image](https://user-images.githubusercontent.com/22959060/40637352-b923fff6-62da-11e8-96fa-667c23529a72.png)
    
### SlingSDK  
  
* Init method
   
### Sling SDK Connect  
  
* Store in the project 
  
* Properties 

### [Contribute](./CONTRIBUTING.md)
