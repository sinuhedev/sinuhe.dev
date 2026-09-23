# page

## To start

Open http://localhost:3000 to view it in the browser.

```sh
bun install
bun dev
bun test
bun run build:dev
bun run build:prod
```

## env

```.env
.env        # loaded in all cases
.env.[mode] # only loaded in specified mode [ dev, test, beta, prod ]
```

 * .env.development
 * .env.production
 * .env.test
 
```.env.[mode]

PUBLIC_TITLE=localhost

```

## biome

```sh
 biome lint . --reporter=summary
```
