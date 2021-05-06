const net = require("net")
var ansiEscapes = require('ansi-escapes');
class Client {
  constructor() {
    this.host = null
    this.client = null
    this.rl = null
  }
  connect(host, port) {
    this.rl = readline.createInterface({
      terminal: true,
      input: process.stdin,
      output: process.stdout
    })
    this.client = net.connect({
      port: port || 23,
      host: host || "towel.blinkenlights.nl"
    })
    this.client.on('data', (data) => {
      this.rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log(data.toString())
    });
    this.client.on('end', () => {
      console.log('disconnected from server');
      this.rl.output.end();
      this.rl.pause();
      this.rl.close();
    });
  }
  write(message) {
    this.client.write(message + '\r\n');
  }
}
module.exports = Client
