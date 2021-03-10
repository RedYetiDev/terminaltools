# Terminal Tools
Welcome to the terminal tools package. This package allows you to do some special tricks within your console screen. Currently, you can do the following:

1. Render Images

![Render Images](https://user-images.githubusercontent.com/38299977/110391296-47bb2080-8035-11eb-83f2-43d66d174dbe.png)

2. Play Videos (Glitches Fixed!)

![Play Videos (Glitches Fixed!)](https://user-images.githubusercontent.com/38299977/110550349-828a8a80-8101-11eb-89cb-c5e98ad2750a.gif)

3. Create a loader

![Create a loader](https://user-images.githubusercontent.com/38299977/110504405-20af2e00-80cb-11eb-800d-fc12b846ac6a.gif)

![pinwheel](https://user-images.githubusercontent.com/38299977/110550579-ef9e2000-8101-11eb-9e4f-ff1cae9bce96.gif)


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
Video playing contains 4 different functions. The first 2 or `framify` and `render`. They are split into 2 different functions for speed reasons. Becuase, you can already have frames ready, and have no need to run `framify`. The third function is called `runall`, and it runs `framify`, then `render`. Now, the 4th function is a special version of `render` called `advrender`.

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
await tools.video.runall("sample.mp4")
```

#### 4. advrender
The `advrender` function renders the frames in 2 parts, first it pre-renders ***ALL*** the frames, then it renders them. The reason for this is it increases the speed of the video, by processing the frames before playback, instead of during

### Loader
There are currently 2 loaders available.
#### 1. line
First, create a new instance of `loader.line`
```js
var line = new tools.loader.line()
```
Then, you can start and end the loader using `start()` and `stop()`

#### 2. pinwheel
First, create a new instance of `loader.pinwheel`
```js
var line = new tools.loader.pinwheel()
```
Then, you can start and end the loader using `start()` and `stop()`

#### Examples
```js
var line = new tools.loader.line()
line.start()
"FUNCTION FUNCTION FUNCTION FUNCTION"
line.end()
```
```js
var pinwheel = new tools.loader.pinwheel()
pinwheel.start()
"FUNCTION FUNCTION FUNCTION FUNCTION"
pinwheel.end()
```
