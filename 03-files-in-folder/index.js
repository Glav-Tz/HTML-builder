const fs = require ('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');
// const infoFile = {
//   nameFile: 'none',
//   extFile:  '.none',
//   sizeFile: '0',
// };
let arrInfoFile = [];

const getInfFile = async (pathFolder) => {
  return new Promise((resolve, rejects) => {    
    fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
      if (err) {
        return rejects (err.message);
      } else {
        files.map((element) => {
          if (element.isDirectory()) {
            getInfFile(path.join(pathFolder, element.name));
            console.log(1);
          } else {
            let currentFile = path.join(pathFolder, element.name);      
            fs.stat(currentFile, (err, stats) => {
              ext(element.name, stats.size);      
            });      
          }
        });
        console.log(arrInfoFile);
        resolve();
      }        
    });
  });
};



// const getInfFile = async (pathFolder) => {
//   fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {  
//     files.map((element) => {
//       if (element.isDirectory()) {
//         getInfFile(path.join(pathFolder, element.name));
//       } else {
//         let currentFile = path.join(pathFolder, element.name);      
//         fs.stat(currentFile, (err, stats) => {
//           console.log(1);
//           console.log(arrInfoFile);
//           return arrInfoFile.push((ext(element.name, stats.size)));          
//         });        
//       }
//     });    
//   });   
// };

function ext(file, fileSize) {
  let arrInfoOneFile = [];  
  let extEnd = (file.split('.')).pop();
  let extFirst = (file.split('.')).shift();
  arrInfoOneFile.push(extFirst, extEnd, fileSize);
  arrInfoFile.push(arrInfoOneFile.join('-'));
  
}
function temp2() {
  return console.log(arrInfoFile);
}

getInfFile(pathFolder)
  .then(() => temp2());


  

// fs.stat(pathFolder, (err, stats) => {
//   console.log(stats.isFile());
//   console.log(stats);

// });

//<имя файла>-<расширение файла>-<вес файла></вес>