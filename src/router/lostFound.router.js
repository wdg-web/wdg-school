const { verify } = require('jsonwebtoken');
const Router = require('koa-router');

const lostFoundRouter = new Router({ prefix: '/lostFound' });

const {
    create,
    detail,
    list,
    getListByUserId,
    update,
    remove,
    fileInfo,
    search
} = require('../controller/lostFound.controller.js');
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware');

lostFoundRouter.post('/', verifyAuth, create);

lostFoundRouter.get('/', list);
lostFoundRouter.get('/getlist/userid', verifyAuth, getListByUserId);
lostFoundRouter.get('/search', search);

lostFoundRouter.get('/:lostFoundId', detail);

// 1.用户必须登录 2.用户具备权限
lostFoundRouter.patch('/:lostFoundId', verifyAuth, verifyPermission, update);

lostFoundRouter.delete('/:lostFoundId', verifyAuth, verifyPermission, remove);

// 动态配图的服务
lostFoundRouter.get('/images/:filename', fileInfo);

module.exports = lostFoundRouter;