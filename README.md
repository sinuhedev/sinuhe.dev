# page

## To start

Open http://localhost:3000 to view it in the browser.

```sh
npm i
node --run dev
```

## env

```.env
.env        # loaded in all cases
.env.[mode] # only loaded in specified mode [ dev, test, beta, prod ]
```

 * .env.dev
 * .env.test
 * .env.beta
 * .env.main
 
```.env.[mode]

PUBLIC_TITLE=localhost

```

## biome

```sh
 biome lint . --reporter=summary
```
