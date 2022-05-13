# createprops

## Overview

This script will create json files in the `src/routes/props` directory.

## Limitation

Please set `prettierrc`'s printWidth to more than 500.

```rc
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 500
}
```

Your export prop must be in one line:

```js
// bad because it has two lines
1 export myprop =
2 'bla bla bla'

// good it is in one line
1 export myprop = 'very long strings here ...... and it must be in one line'
```

## Installation

```
npm i -D createprops
```

## Usage

In your package.json add the following link in the `scripts`:

```
...
"scripts": {
	...
		"props": "node ./node_modules/createprops/createprops.js"
	}
```

The default value for destination is `./src/routes/props`. You can change it using `--dest`:

```
"scripts": {
	...
		"props": "node ./node_modules/createprops/createprops.js --dest ./props/"
	}
```

The default value for lib directory is `./src/lib`. You can change it using `--src`:

```
"scripts": {
	...
		"props": "node ./node_modules/createprops/createprops.js --src ./src/mylib-dir"
	}
```

## Features

## Reference

## Author

## License

Please see license.txt.
