const fs = require ('fs');
const path = require('path');
const copyDirectory = path.join(__dirname, 'files-copy');
const rootDirectory = path.join(__dirname, 'files');

async function creatingDirectory(pathFolder) {  
  fs.mkdir(pathFolder, err => {
    if(err) {
      console.log('Папку уже существуюет, запускаю актуализацию файлов.');
      return (updatingFile());
    }
    console.log('Создаю папку, запускаю копирование файлов.');
    return copy();   
  });
}

async function listFiles(pathFolder) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathFolder, (err, files) => {
      if (err) {
        return reject('Упс!_listFiles');
      } else {       
        return resolve(files);
      }    
    });
  });  
}

async function fileCopy(nameFileArr) {  
  return new Promise((resolve, reject) => {    
    nameFileArr.forEach((element) => {
      let whereFrom = path.join(rootDirectory, element);
      let whereCopy = path.join(copyDirectory, element);      
      fs.copyFile(whereFrom, whereCopy, err => {
        if(err) {
          return reject((console.log('Упс!_nameFileArr'))); 
        }        
      });      
    });
    resolve ();
  });
}

async function DelFile(nameFileArr) {
  return new Promise((resolve, reject) => {    
    nameFileArr.forEach((element) => {
      let whereDelete = path.join(copyDirectory, element);      
      fs.unlink(whereDelete, err => {
        if(err) {
          return reject((console.log('Упс!_Del'))); 
        }       
      });
    });
    return resolve();
  });
}

async function copy() {  
  const nameFileArr = await listFiles(rootDirectory);    
  await fileCopy(nameFileArr);
  console.log('Файлы успешно скопированы.');  
}

async function updatingFile() {
  const nameFileArr = await listFiles(copyDirectory);
  await DelFile(nameFileArr);
  await fileCopy(nameFileArr);
  console.log('Актуализацию закончена.'); 
}

creatingDirectory(copyDirectory);


