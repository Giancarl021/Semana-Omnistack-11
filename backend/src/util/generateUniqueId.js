const {
    randomBytes
} = require('crypto');

module.exports = function () {
    return randomBytes(4).toString('HEX');
}