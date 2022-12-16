<h1 align="center">Createprops</h1>

<p align="center">
<a href="https://shinokada.github.io/createprops/">Createprops</a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/createprops" rel="nofollow"><img src="https://img.shields.io/npm/v/createprops" alt="npm"></a>
<a href="https://twitter.com/shinokada" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@shinokada-4BBAAB.svg" alt="Created by Shin Okada"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/shinokada/createprops" alt="License"></a>
<a href="https://www.npmjs.com/package/createprops" rel="nofollow"><img src="https://img.shields.io/npm/dw/createprops.svg" alt="npm"></a>
</p>

## Overview

This script will create json files in the `src/routes/props` directory. This script is created for Svelte and please let me know if it works for other framework.

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

## Limitation

1. All exported props must end with `;`

The script uses `;` to split lines. If you are using VS code, it automatically inserts `;` at the end of each line when you save a file.

```js
// 💩 no ; at the end
export let myvar: string = 'bla bla';

// good
export let myvar: string = 'bla bla';
```

2. Set all the exported props at the top after import statements.

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

3. Does not extract functions

Currently the script is not able to extract functions.

```js
// can't do it
export function greet(name) {
  alert(`hello ${name}!`);
}

// can't do it
export const myfunc = (name) => {
  open = !open;
};
```

4. Does not extract multi-layered objects

```js
// can do
export let icons: AccordionIconType = {
  up: ChevronUpSolid,
  down: ChevronDownSolid
};

// can't do it
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
