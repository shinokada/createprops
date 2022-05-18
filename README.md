# createprops

## Overview

This script will create json files in the `src/routes/props` directory. This script is created for Svelte and please let me know if it works for other framework.

## Limitation

1. All props end with `;`

The script uses `;` to split lines. If you are using VS code, it automatically inserts `;` at the end of each line when you save it.

```js
// 💩 no ; at the end
export let myvar: string = 'bla bla';

// good
export let myvar: string = 'bla bla';
```

2. Do not use type inference

Always write types explicitly.

```js
// 💩 no inference
export let myvar = 'bla bla';

// good
export let myvar: string = 'bla bla';
```

## Example

From `Aside.svelte`:

```js
export let transitionParams: TransitionParamTypes = {};
export let transitionType: TransitionTypes = 'fly';
export let asideClass: string = 'absolute w-auto h-screen bg-gray-200 border-r-2 shadow-lg';
```

To `Aside.json`:

```json
{
  "props": [
    ["transitionParams", " TransitionParamTypes ", " {}"],
    ["transitionType", " TransitionTypes ", " 'fly'"],
    ["asideClass", " string ", " 'absolute w-auto h-screen bg-gray-200 border-r-2 shadow-lg'"]
  ]
}
```

## Prop tables

You can create a table using `Table` and `TableDefaultRow` components.

Tailwind CSS example.

```html
<script>
  import { Table, TableDefaultRow } from 'createprops';
  import componentProps from '../Card/.json'
  // Props table
  let items = componentProps.props
	let propHeader = ['Name', 'Type', 'Default']

  let divClass='w-full relative overflow-x-auto shadow-md sm:rounded-lg py-4'

  let theadClass ='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white'
</scipt>

<Table header={propHeader} {divClass} {theadClass}>
  <TableDefaultRow {items} rowState='hover' />
</Table>
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

## License

Please see license.txt.
