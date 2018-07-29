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
    var vLine = line.trim()
    if (vLine.includes("proxy")) {
        if (vLine.includes("#")) {
            this.output.write(`${vLine.replace('#','\t')}\n`)
            console.log("Proxy for Git (" + vLine.split('=')[1] + ") turned on..")
        } else {
            this.output.write(`#${vLine}\n`)
            console.log("Proxy for Git (" + vLine.split('=')[1] + ") turned off..")
        }
    } else {
        if (vLine.includes("[")) {
            this.output.write(`${vLine}\n`)
        } else {
            this.output.write(`\t${vLine}\n`)
        }
        
    }
}