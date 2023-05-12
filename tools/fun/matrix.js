class Matrix {
    static domatrix = false;
    /**
     * Start the matrix
     * @param {String[]} letters The letters to use
     * @static
     * @example
     * Matrix.start(["0", "1"]);
     */
    static start(letters = null) {
        this.#start(letters); // Why? If you await the #start method, it will be awaited forever (A long time).
    }

    static async #start(letters = null) {
        this.domatrix = true;
        console.clear();
        console.log('\x1b[1;40m');
        const rows = process.stdout.rows;
        const columns = process.stdout.columns;
        const cols = [];

        if (letters.find(l => l.length > 1)) throw new Error("Letters must be one character long");

        while (this.domatrix) {
            const randomCol = Math.floor(Math.random() * columns);
            const letter = letters?.[Math.floor(Math.random() * letters.length)] || Math.floor(Math.random() * 2);
            cols[randomCol] = 0;
            for (const col in cols) {
                const randomNum = Math.floor(Math.random() * 20);

                let line;
                if (cols[col] < 0) {
                    line = -cols[col];
                    cols[col] -= 1;
                    const subline = -cols[col] + 1;

                    console.log(`\x1b[${line};${col}H \x1b[0;0H`);
                    if (subline >= rows || randomNum < 1) {
                        cols[col] = 0;
                    }
                } else {
                    line = cols[col]++;
                    if (randomNum < 3) {
                        console.log(`\x1b[${line};${col}H\x1b[1;32m${letter}\x1b[0m`);
                    } else {
                        console.log(`\x1b[${line};${col}H\x1b[2;32m${letter}\x1b[0m`);
                    }
                    console.log(`\x1b[${line + 1};${col}H\x1b[37m${letter}\x1b[0;0H\x1b[0m`);

                    if (cols[col] >= rows && randomNum < 2) {
                        cols[col] = 0;
                    } else if (cols[col] >= rows) {
                        cols[col] = -1;
                    }
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    /**
     * Stop the matrix
     * @static
     * @example
     * Matrix.stop();
     */
    static stop() {
        this.domatrix = false;
        console.clear();
    }
}

module.exports = Matrix;