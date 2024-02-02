/**
 * copied almost directly from Mersenne Twister implementation found in https://gist.github.com/banksean/300494
 * all rights reserved to him.
 * you can than use it as follows:
 * var random = new Random(132);
 * random.nextInt32(); //return a pseudo random int32 number
 * random.nextInt32([10,20]); //return a pseudo random int in range [10,20]
 * random.nextNumber(); //return a a pseudo random number in range [0,1]
 *
 * This JavaScript code should work in any environment where JavaScript is supported. However, note that the usage of module.exports at the end is specific to a CommonJS module system (like Node.js). If you're using this in a browser, you'll need to remove that line and use the Random class directly.
 */
let Random = {
    N: 624,
    M: 397,
    MATRIX_A: 0x9908b0df,
    UPPER_MASK: 0x80000000,
    LOWER_MASK: 0x7fffffff,
    mt: new Array(624),
    mti: 625,

init_genrand(s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
        this.mt[this.mti] = (s * 1812433253 + this.mti) >>> 0;
    }
}

    _nextInt32() {
        var y;
        var mag01 = [0x0, this.MATRIX_A];
        if (this.mti >= this.N) {
            var kk;
            if (this.mti == this.N + 1)
                this.init_genrand(5489);
            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            this.mti = 0;
        }
        y = this.mt[this.mti++];
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);
        return y >>> 0;
    },

    nextInt32(range = null) {
        var result = this._nextInt32();
        if (range == null) {
            return result;
        }
        return (result % (range[1] - range[0])) + range[0];
    },

    nextInt31() {
        return (this._nextInt32() >>> 1);
    },

    nextNumber() {
        return this._nextInt32() * (1.0 / 4294967295.0);
    },

    nextNumber53() {
        var a = this._nextInt32() >>> 5,
            b = this._nextInt32() >>> 6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    }
};


module.exports = Random;