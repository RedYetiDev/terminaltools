const net = require("net")
var ansiEscapes = require('ansi-escapes');
class Client {
  constructor() {
    this.host = null
    this.client = null
    this.rl = null
    this.on = {
      'data': function() {},
      'end': function() {},
    };
  }
  on(event, callback) {
    this.on[event] = callback;
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
      this.on["data"](data);
    });
    this.client.on('end', () => {
      this.on["end"]();
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
