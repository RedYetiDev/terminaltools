<table>
<thead>
<tr>
<th>Class</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Snowfall</td>
<td>A JavaScript class that displays a snowfall-like effect on the console screen.</td>
</tr>
<tr>
<td><code>Snowfall.start()</code></td>
<td>Initializes the Snowfall effect on the console. It starts generating snowflakes that fall down from the top of the console screen.</td>
</tr>
<tr>
<td><code>Snowfall.stop()</code></td>
<td>Stops the Snowfall effect on the console and clears the console screen. It stops generating snowflakes and clears the console screen.</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Class</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Matrix</td>
<td>A JavaScript class that displays a matrix-like effect on the console screen.</td>
</tr>
<tr>
<td><code>Matrix.start(letters = [&quot;0&quot;, &quot;1&quot;])</code></td>
<td>Initializes the Matrix effect on the console. It takes an optional <code>letters</code> argument, which is an array of characters that can be displayed on the screen. If <code>letters</code> is not provided, the Matrix effect will use only the characters 0 and 1.</td>
</tr>
<tr>
<td><code>Matrix.stop()</code></td>
<td>Stops the Matrix effect on the console and clears the console screen.</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Rainbow</td>
<td>A JavaScript function that takes a message as an argument and adds a random color to each letter in the message.</td>
</tr>
<tr>
<td><code>rainbow(message)</code></td>
<td>Logs the colored message to the console.</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>renderVideo</td>
<td>Converts a video file into a series of ASCII frames.</td>
</tr>
<tr>
<td><code>renderVideo(videoPath)</code></td>
<td>Returns a Promise that resolves to an array of ASCII frames representing the video file.</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>renderImage</td>
<td>Converts an image to a string of ANSI escape codes representing the image in the terminal.</td>
</tr>
<tr>
<td><code>renderImage(image)</code></td>
<td>Returns a Promise that resolves to a string of ANSI escape codes representing the image in the terminal.</td>
</tr>
<tr>
<td><code>renderImage.rgbToAnsi256(r, g, b)</code></td>
<td>Converts an RGB color value to its corresponding ANSI escape code value.</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Class</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Mute</td>
<td>A class used to mute and capture the output of <code>process.stdout.write()</code> method.</td>
</tr>
<tr>
<td><code>&lt;instance&gt;.mute()</code></td>
<td>Mutes the <code>process.stdout.write()</code> method by overriding it with a new function that stores all the output in the <code>this.output</code> property and does not output anything to the console.</td>
</tr>
<tr>
<td><code>&lt;instance&gt;.unmute()</code></td>
<td>Restores the original <code>process.stdout.write()</code> method by assigning <code>this.originalWrite</code> to it.</td>
</tr>
<tr>
<td><code>&lt;instance&gt;.clearOutput()</code></td>
<td>Clears the <code>this.output</code> property by setting it to an empty string.</td>
</tr>
<tr>
<td><code>&lt;instance&gt;.getOutput()</code></td>
<td>Returns the captured output stored in the <code>this.output</code> property.</td>
</tr>
</tbody>
</table>
