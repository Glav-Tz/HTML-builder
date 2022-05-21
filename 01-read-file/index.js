const fs = require ('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'text.txt');

const streamRd  = new fs.ReadStream(pathFolder, 'utf-8');

streamRd.on('readable', () => {
  const data = streamRd.read();
  if (data !== null) {
    return console.log(data);
  }  
});
