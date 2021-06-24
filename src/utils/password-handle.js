const crypto = require('crypto');

const cryptoMd5 = (password) => {
    const md5 = crypto.createHash('md5');
    const result = md5.update(password).digest('hex');
    //digest('hex')转成16进制
    return result;
}

module.exports = cryptoMd5;