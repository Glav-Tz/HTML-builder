//const { rejects } = require('assert');
//const { resolve } = require('path');
const fs = require ('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pathFolder = path.join(__dirname, 'text.txt');
let dataAppend = '';
// const readline = require('readline/promises');
// const stdin = process.stdin;
// const stdout = process.stdout;
// const rl = readline.createInterface(
//   stdin, stdout);
// const process = require('process');


const writeFileAsync = async (pathFolder, dataAppend) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(pathFolder, dataAppend, (err) => {
      if (err) {
        return rejects (err.message);
      } else {
        console.log('Файл создан, ожидается ввод произвольного значения');
        resolve();
      }      
    });
  });
};

const appendFileAsync = async (pathFolder, dataAppend) => {
  return new Promise((resolve, rejects) => {
    fs.appendFile(pathFolder, dataAppend, (err) => {
      if (err) {
        return rejects (err.message);
      } else {
        resolve();
      }      
    });
  });
};

writeFileAsync(pathFolder, dataAppend);

readline.on('line', (dataAppend) => {
  if (dataAppend === 'exit') {
    console.log ('На сегодня хватит');
    return readline.close();
  } 
  appendFileAsync(pathFolder, dataAppend);
  console.log('можно еще');
});

process.on('exit', () => {  
  console.log('За что так грубо');
});


// .then(() => appendFileAsync(pathFolder, dataAppend))  
// .catch((err) => console.log(err));





// // const process = require('process');
// // const stdin = process.stdin;
// // const stdout = process.stdout;
// // //const { stdin, stdout } = process;

// // stdout.write('Как тебя зовут?\n');
// // stdin.on('data', data => {
// //   stdout.write('Привет, ');
// //   stdout.write(data);
// //   process.exit();
// // });
// // process.on('exit', () => stdout.write('Удачи!'));