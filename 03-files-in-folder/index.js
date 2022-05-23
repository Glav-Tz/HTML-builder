const fs = require ('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

let tempArr = [];
async function fileSize(element) {
  const promiseFileSize = new Promise((resolve, reject) => {
    let currentFile = path.join(pathFolder, element.name);
    fs.stat(currentFile, (err, stats) => {
      if (err) {
        return reject('Упс!_fileSize');
      }else {        
        return resolve(stats.size);
      }                  
    });        
  });
  return promiseFileSize;
}


async function arrInfoFile (fileSize, file) {
  const promiseInfo = new Promise((resolve) => {
    let arrInfoOneFile = [];  
    let extEnd = (file.split('.')).pop();
    let extFirst = (file.split('.')).shift();
    arrInfoOneFile.push(extFirst, extEnd, fileSize);
    return resolve(arrInfoOneFile.join('-'));  
  });
  return promiseInfo;
}

async function listFiles(pathFolder) {
  const promiseReaddir = new Promise((resolve, reject) => {
    fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject('Упс!_listFiles');
      } else {       
        return resolve(files);
      }    
    });
  });
  return promiseReaddir;
}

async function infoFiles(arrData) {
  const promiseInfoFile = new Promise((resolve) => {
    arrData.forEach((element) => {
      if (element.isDirectory()) {
        console.log(1);        
      }else {
        fileSize(element)
          .then(size => arrInfoFile(size, element.name))
          .then(stringInfo => {
            console.log(stringInfo);
            return tempArr.push(stringInfo);
          });        
      }
    });    
    resolve(tempArr);
  });
  return promiseInfoFile;
}

async function asyncStart() {
  let step1 = await listFiles(pathFolder);
  let step2 = await infoFiles(step1);
  console.log('step2');
  console.log(step2);  
}

asyncStart();

