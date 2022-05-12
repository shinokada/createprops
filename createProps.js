/**
 * This script will create a json file for each component. First it will remove all files in the src/props directory. Then it will read each file in the lib directory and extract the props from the file and write in the `src/props` directory.
 * 
 * Run this script from the root of the project.
 * node createProps.js
 * 
 */

import * as fs from 'fs';
import path from 'path';
import {lstat, readdir} from 'node:fs/promises'
import {join} from 'node:path'

const srcLib = '../src/lib'

const getLines=(fileName, keyword)=> { 
  let outputs =[];
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  let arr = file.split(/\r?\n/);
  arr.forEach((line) => {
    if(line.includes(keyword)){
      outputs.push(line);
    }
  });
  return outputs
}

async function createFilenames () {
  const deepReadDir = async (dirPath) => await Promise.all(
    (await readdir(dirPath)).map(async (entity) => {
      const path = join(dirPath, entity)
      return (await lstat(path)).isDirectory() ? await deepReadDir(path) : path
    }),
  )
  const files = await deepReadDir(srcLib)
  const all = files.flat(Number.POSITIVE_INFINITY)
  return all
}

function extractProps (arr) {
  let first, second, third;
  let obj ={}
  let result =[]
  arr.forEach(
    (line) => {
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
          third = '-'
      }
      // console.log('third', third)
      let myarr = [first, second, third]
      result.push(myarr)
    }
    
  )
  obj.props=result
  return obj
}

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!', fileName);
  });
}

const exportLet = 'export let'

// remove all files in the folder
const directory = '../src/routes/props/';
fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
    console.log('file deleted: ', file)
  }
});

const allFiles = await createFilenames()
// console.log( allFiles)
allFiles.forEach(myfile => {
  // create a file name
  let name = path.parse(myfile).name
  let outputfile = directory + name + '.json'
  // console.log('name: ', name)
  let result = getLines(myfile, exportLet);
  // console.log('result: ', result)
  if (result.length > 0) {
    // console.log('result: ', result)
    let resultItem = extractProps(result);
    // console.log('resultItem: ', resultItem)
    writeToFile(outputfile, JSON.stringify(resultItem))
  }
})
