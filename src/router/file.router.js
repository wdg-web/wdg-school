const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/auth.middleware');
const {
    avatarHandler,
    pictureHandler,
    imageHandler
} = require('../middleware/file.middleware');
const {
    saveAvatarInfo,
    savePictureInfo,
    saveImageInfo
} = require('../controller/file.controller');

const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);

fileRouter.post('/picture', verifyAuth, pictureHandler, savePictureInfo);

fileRouter.post('/sesondHandImage', verifyAuth, imageHandler, saveImageInfo);

module.exports = fileRouter;