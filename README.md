<div align="center">

# TerminalTools

### Version 3.0.0

**Tools for your terminal**

</div>

---

**TerminalTools** provides little bits of fun for your average terminal

## Installation

TerminalTools is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [npm install](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command:

```bash
$ npm install terminaltools
```

You can also just add it to your `package.json` file, and it will be installed the next time you run `npm install`:

```json
{
  "dependencies": {
    "terminaltools": "^3.0.0"
  }
}
```

## Basic Usage
```js
const TerminalTools = require('terminaltools');
// renderVideo
let frames = TerminalTools.renderVideo('path/to/video.mp4');
let i = frames.length;
let interval = setInterval(() => {
  console.log(frames[i]);
  i--;
  if (i < 0) {
    clearInterval(interval);
  }
}, 1000 / 30);

// renderImage
TerminalTools.renderImage('path/to/image.png').then(console.log);

// Banner
let banner = new TerminalTools.Banner();
banner.load();
banner.write('Hello, World!');

// Mute
let mute = new TerminalTools.Mute();
mute.mute();
console.log("You won't see this");
mute.unmute();
console.log("You will see this");
mute.getOutput(); // You won't see this
mute.clearOutput();

// fun.Matrix
TerminalTools.fun.Matrix.start();
setTimeout(() => {
  TerminalTools.fun.Matrix.stop();
}, 5000);

// fun.Snowfall
TerminalTools.fun.Snowfall.start();
setTimeout(() => {
  TerminalTools.fun.Snowfall.stop();
}, 5000);

// fun.Rainbow
TerminalTools.fun.Rainbow("Hello, World!");
```

_For API usage, and more specific examples, refer to the [API](https://tt.js.org)._

## Contributing

To help with the development of TerminalTools, you can contribute to the project by submitting issues, pull requests, or shooting me an email at [RedYetiDev@gmail.com](mailto:redyetidev@gmail.com).

## License

TerminalTools is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license. This means that you can use TerminalTools in any way you want, as long as you give credit to me, the original author ([RedYetiDev](https://redyetidev.github.io)).

> **What is "as long as you give credit to me"?**
>
> Giving credit is showing that you used TerminalTools in your project. This can be done by linking to the [GitHub repository](https://github.com/RedYetiDev/terminaltools), or by linking to the [npm package](https://www.npmjs.com/package/terminaltools).