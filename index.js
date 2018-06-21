var fs = require('fs')
var path = require('path');
const homedir = require('os').homedir();
const readline = require('readline');

var gitconfigPath = path.join(homedir, '.gitconfig');
var gitconfigPathx = path.join(homedir, '.gitconfigx');

var config = readline.createInterface({
    input: fs.createReadStream(gitconfigPath),
    output: fs.createWriteStream(gitconfigPathx),
    terminal: false
  });
  
  config
    .on('line', modifyLine)
    .on('close', function() {
      fs.unlinkSync(this.input.path);
      fs.renameSync(this.output.path,this.input.path);
  });

function modifyLine(line) {
    if (line.includes("proxy")) {
        if (line.includes("#")) {
            this.output.write(`${line.replace('#','')}\n`)
        } else {
            this.output.write(`# ${line}\n`)
        }
    } else {
        this.output.write(`${line}\n`)
    }
}