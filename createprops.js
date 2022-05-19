/**
 * This script will create a json file for each component. First it will remove all files in the src/props directory. Then it will read each file in the lib directory and extract the props from the file and write in the `src/props` directory.
 *
 * Run this script from the root of the project.
 * node createProps.js
 * You can pass arguments to the script.
 * node createProps.js --src=src/lib --dest=src/props
 */

import * as fs from 'fs';
import path from 'path';
import { lstat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const defaultSrc = './src/lib';
const defaultDest = './src/routes/props/';
const exportLet = 'export let';

// Checks for --dest (destination) and if it has a value
const destIndex = process.argv.indexOf('--dest');
let destValue;

if (destIndex > -1) {
  // Retrieve the value after --dest
  destValue = process.argv[destIndex + 1];
}

// set destination directory
const directory = destValue || defaultDest;

// Checks for --src and if it has a value
const srcIndex = process.argv.indexOf('--src');
let srcValue;

if (srcIndex > -1) {
  // Retrieve the value after --src
  srcValue = process.argv[srcIndex + 1];
}

// set lib directory value
const srcLib = srcValue || defaultSrc;

const getLines = (fileName, keyword) => {
  let outputs = [];
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });

  // removed comment lines, remove line with script, join all lines into one string then split by ; to create an array
  let arr = file
    .split('\n')
    .filter((line) => !line.includes('//'))
    .filter((line) => !line.includes('script'))
    .join(' ')
    .split(/;/);

  arr.forEach((line) => {
    if (line.includes(keyword)) {
      outputs.push(line);
    }
  });
  return outputs;
};

async function createFilenames() {
  const deepReadDir = async (dirPath) =>
    await Promise.all(
      (
        await readdir(dirPath)
      ).map(async (entity) => {
        const path = join(dirPath, entity);
        return (await lstat(path)).isDirectory() ? await deepReadDir(path) : path;
      })
    );
  const files = await deepReadDir(srcLib);
  const all = files.flat(Number.POSITIVE_INFINITY);
  return all;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function extractProps(arr) {
  let name, type, value;
  let obj = {};
  let result = [];
  arr.forEach((line) => {
    // remove all line breaks
    let newline = line.replace(/[\r\n]+/gm, '');
    // remove tab indentation
    newline = newline.replace(/\t/g, '');
    // or space indentation
    newline = newline.replace('export let ', '');

    // check if line contains : a colon
    // the position of : needs to be before the position of =
    // for example myvar = 'text-gray-700 hover:bg-gray-100'
    // otherwise it will slice after hover:
    let colonPosition = newline.indexOf(':');
    let equalsPosition = newline.indexOf('=');
    if (newline.includes(':')) {
      name = newline.slice(0, newline.indexOf(':')).trim();
      type = newline.slice(newline.indexOf(':') + 1, newline.length).trim();
      // console.log('type', type)
      if (type.includes('=')) {
        type = type.slice(0, type.indexOf('='));
        value = newline.slice(newline.indexOf('=') + 1, newline.length).trim();
      } else {
        value = '-';
      }
    } else {
      // no : in the line
      // it should have = sign to separate name and value
      console.log(newline.indexOf('='));
      name = newline.slice(0, newline.indexOf('='));

      value = newline.slice(newline.indexOf('=') + 1, newline.length);
      console.log(name, value);
      // if value has ' then it is a string
      if (value.includes("'")) {
        type = 'string';
      } else if (value.includes('Symbol()')) {
        type = 'symbol';
      } else if (value.includes('new Date()')) {
        type = 'date';
      } else {
        // otherwise find the type by using typeof the type value
        type = typeof JSON.parse(value);
      }
    }
    // console.log('value', value)
    let myarr = [name, type, value];
    result.push(myarr);
  });
  obj.props = result;
  return obj;
}

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!', fileName);
  });
};

// remove all files in the folder
fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
    console.log('file deleted: ', file);
  }
});

const allFiles = await createFilenames();
// console.log( allFiles)
allFiles.forEach((myfile) => {
  // create a file name
  let name = path.parse(myfile).name;
  let outputfile = directory + name + '.json';
  // console.log('name: ', name)
  let result = getLines(myfile, exportLet);
  // console.log('result: ', result)
  if (result.length > 0) {
    // console.log('result: ', result)
    let resultItem = extractProps(result);
    // console.log('resultItem: ', resultItem)
    writeToFile(outputfile, JSON.stringify(resultItem));
  }
});
