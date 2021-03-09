# Terminal Tools
Welcome to the terminal tools package. This package allows you to do some special tricks within your console screen. Currently, you can do the following:

1. Render Images
![Render Images](https://user-images.githubusercontent.com/38299977/110391296-47bb2080-8035-11eb-83f2-43d66d174dbe.png)
2. Play Videos (Still a little glitchy)
![Play Videos](https://user-images.githubusercontent.com/38299977/110498207-1f7b0280-80c5-11eb-98d8-de332108c39f.gif)
3. Create a loader
![Create a loader](https://user-images.githubusercontent.com/38299977/110504405-20af2e00-80cb-11eb-800d-fc12b846ac6a.gif)

## Installation
First, install the `terminaltools` package, using the following command
```sh
npm i terminaltools
```
Next, add `terminaltools` to your scripts using the `require` command.
```js
const tools = require("terminaltools")
```

## Using
The following information assumes you have the following code in your scripts
```js
const tools = require("terminaltools")
```

### Rendering Images
To render an image, you should use the `image` function. The function takes 1 parameter, which is the path to the image. The function is [asynchronous](https://www.merriam-webster.com/dictionary/asynchronous). and returns the image as a `String`. After running the function, you can display the image using `console.log`. (You can use a URL for this function)


#### Example
```js
var image = await tools.image("image.png")
console.log(image)
```

### Playing Videos
To play a video, there are 3 different functions. All functions below are prefixed with `video`. The reason for 3 functions is that "framifying" takes time depending on the video length, and you might already have frames ready for rendering.

#### 1. framify
The `framify` function takes a video input and converts it to a folder full of frames. The folder is located in the current working directory. ***NOTE***: Please create a `frames` folder in the current working directory before running.

##### Example
```js
await tools.video.framify("sample.mp4")
```
(You then end up with a folder named `frames` in the current working directory)

#### 2. render
The `render` function takes no parameter and ***MUST*** be run from the same directory that contains the `frames` folder.

##### Example
```js
await tools.video.render()
```

#### 3. runall
The `runall` function runs both of the functions.

##### Example
```js
runall("sample.mp4")
```

### Loader
To create a loader, first create a new instance of the `loader` class
```js
const loader = new tools.loader()
```
Once a loader has been created, you can start and stop it using the `start()` and `end()` function. This is usefull when you have long functions with no output.

#### Example
```js
const loader = new tools.loader()
loader.start()
"Run a long function here"
loader.end()
```
