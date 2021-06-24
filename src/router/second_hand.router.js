const Router = require('koa-router');

const secondHandRouter = new Router({ prefix: '/secondhand' });

const {
    create,
    list,
    listBytime,
    single,
    remove,
    fileInfo,
    search,
    listByUserId
} = require('../controller/second_hand.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')


secondHandRouter.post('/', verifyAuth, create)

secondHandRouter.get('/', list);
secondHandRouter.get('/search', search);
secondHandRouter.get('/bytime', listBytime);

secondHandRouter.get('/:secondHandId', single);
secondHandRouter.get('/getlist/byid', verifyAuth, listByUserId);

// 用户必须登录和用户具备权限
secondHandRouter.delete('/:secondHandId', verifyAuth, remove);
// secondHandRouter.delete('/:secondHandId', verifyAuth, verifyPermission, remove);


// 动态配图的服务
secondHandRouter.get('/images/:filename', fileInfo);


module.exports = secondHandRouter;