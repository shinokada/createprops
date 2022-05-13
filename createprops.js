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
  let arr = file.split(/\r?\n/);
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

function extractProps(arr) {
  let first, second, third;
  let obj = {};
  let result = [];
  arr.forEach((line) => {
    // could be tab indentation
    let newl = line.replace('\texport let ', '').replace(';', '');
    // or space indentation
    let newline = newl.replace('export let ', '').replace(';', '');
    first = newline.slice(0, newline.indexOf(':'));
    second = newline.slice(newline.indexOf(':') + 1, newline.length);
    // console.log('second', second)
    if (second.includes('=')) {
      second = second.slice(0, second.indexOf('='));
      third = newline.slice(newline.indexOf('=') + 1, newline.length);
    } else {
      third = '-';
    }
    // console.log('third', third)
    let myarr = [first, second, third];
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
