# createprops

## Overview

This script will create json files in the `src/routes/props` directory.

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
		"props": "node ./node_modules/createprops/createprops.js --dest=src/"
	}
```

The default value for lib directory is `./src/lib`. You can change it using `--src`:

```
"scripts": {
	...
		"props": "node ./node_modules/createprops/createprops.js --src=src/mylib"
	}
```

## Features


## Reference


## Author


## License

Please see license.txt.
