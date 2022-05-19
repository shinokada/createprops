# createprops

## Overview

This script will create json files in the `src/routes/props` directory. This script is created for Svelte and please let me know if it works for other framework.

## Limitation

1 All exported props must end with `;`

The script uses `;` to split lines. If you are using VS code, it automatically inserts `;` at the end of each line when you save a file.

```js
// 💩 no ; at the end
export let myvar: string = 'bla bla';

// good
export let myvar: string = 'bla bla';
```

2 Set all the exported props at the top after import statements.

```js
// 💩 no
$: if (color && isOpen) {
  buttonClass = btnClass + colorClass;
} else {
  buttonClass = btnClass;
}
export let iconSize: number = 24;

// good
export let iconSize: number = 24;
$: if (color && isOpen) {
  buttonClass = btnClass + colorClass;
} else {
  buttonClass = btnClass;
}
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

## Installation

```sh
npm i -D createprops
```

## Usage

In your package.json add the following link in the `scripts`:

```json
...
"scripts": {
  ...
    "props": "node ./node_modules/createprops/createprops.js"
  }
```

The default value for destination is `./src/routes/props`. You can change it using `--dest`:

```json
"scripts": {
  ...
    "props": "node ./node_modules/createprops/createprops.js --dest ./props/"
  }
```

The default value for lib directory is `./src/lib`. You can change it using `--src`:

```json
"scripts": {
  ...
    "props": "node ./node_modules/createprops/createprops.js --src ./src/mylib-dir"
  }
```

## Prop tables

You can create a table using Flowbite-Svelte's `Table` and `TableDefaultRow` components.

```sh
npm i -D flowbite-svelte
```

```html
<script>
  import { Table, TableDefaultRow } from 'flowbite-svelte';
  // import your prop file
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

## Example

[Example](https://svelte-sidebar.vercel.app/props)

## License

Please see license.txt.
