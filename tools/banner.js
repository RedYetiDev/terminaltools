const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
// The Unifont .hex.gz file is in extras/unifont.hex.gz
/**
 * @class Banner
 */
class Banner {
    /**
     * Load the hex file
     * @param {String} [hexFilePath="extras/unifont-15.0.01.hex.gz"] 
     * @example
     * const banner = new Banner();
     * banner.load();
     */
    load(hexFilePath) {
        if (!hexFilePath) {
            // ../extras/unifont-15.0.01.hex.gz
            // TODO: Check the relativity of this path
            hexFilePath = path.resolve(__dirname, "../extras/unifont-15.0.01.hex.gz");
        }
        this.hexFile = fs.readFileSync(hexFilePath);
        // is it gzipped?
        if (this.hexFile[0] === 0x1f && this.hexFile[1] === 0x8b) {
            this.hexFile = zlib.gunzipSync(this.hexFile);
        }
    }
    /**
     * Get the character from the hex file
     * @param {String} char 
     * @returns {String} The character in the hex file
     * @example
     * const banner = new Banner();
     * banner.load();
     * banner.getChar("A");
     */
    getChar(char) {
        const charCode = char.charCodeAt(0);
        const hexCode = charCode.toString(16).padStart(4, "0").toUpperCase();
        const hexIndex = this.hexFile.indexOf(`${hexCode}:`);
        if (hexIndex === -1) {
            // Unicode Error Character: U+FFFD (�)
            return this.getChar("�")
        }
        let hexLine = this.hexFile.slice(hexIndex + 5, this.hexFile.indexOf("\n", hexIndex)).toString();
        hexLine = Buffer.from(hexLine, "hex").toString("binary");
        hexLine = [...hexLine].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
        const width = hexLine.length / 16;
        hexLine = hexLine.replace(new RegExp(`(.{${width}})`, 'g'), '$1\n');
        hexLine = hexLine.replace(/[01]/g, c => c === '0' ? ' ' : '█');
        return hexLine;
    }
    /**
     * Prints the string to the console, in the form of a banner
     * @param {String} string The string to write
     * @example
     * const banner = new Banner();
     * banner.load();
     * banner.write("Hello, World!");
     */
    write(string) {
        let chars = string.split("").map(this.getChar.bind(this));
        let height = chars[0].split("\n").length;

        let output = "";
        for (let i = 0; i < height; i++) {
            output += chars.map(c => c.split("\n")[i]).join("") + "\n";
        }

        console.log(output);
    }
}

module.exports = Banner;