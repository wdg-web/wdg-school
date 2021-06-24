const path = require('path');

const Multer = require('koa-multer');
const Jimp = require('jimp'); //图片处理
const { AVATAR_PATH, PICTURE_PATH, IMAGE_PATH } = require('../constants/file-path');

const avatarUpload = Multer({
    dest: AVATAR_PATH
});
const avatarHandler = avatarUpload.single('avatar');

const pictureUpload = Multer({
    dest: PICTURE_PATH
});
const pictureHandler = pictureUpload.array('files', 9);
// const pictureHandler = pictureUpload.array('picture', 9);

const imageUpload = Multer({
    dest: IMAGE_PATH
});
const imageHandler = imageUpload.array('files', 20);

module.exports = {
    avatarHandler,
    pictureHandler,
    imageHandler
}