const fs = require ('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

async function listFiles(pathFolder) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject('Упс!_listFiles');
      } else {       
        return resolve(files);
      }    
    });
  });  
}

function infoFiles(list) {  
  list.forEach((element) => {
    if (!element.isDirectory()) {
      let arrInfoOneFile = [];
      let currentFileFs = path.join(pathFolder, element.name);
      let extEnd = (element.name.split('.')).pop();
      let extFirst = (element.name.split('.')).shift();      
      fs.stat(currentFileFs, (err, stats) => {          
        if (err) {
          return (console.log('Упс!_fileSize'));
        } else {            
          arrInfoOneFile.push(extFirst, extEnd, stats.size);            
          console.log(arrInfoOneFile.join('-'));
        }                  
      });
    }  
  });
}

async function asyncStart() {
  let list = await listFiles(pathFolder);
  infoFiles(list);  
}

asyncStart();
