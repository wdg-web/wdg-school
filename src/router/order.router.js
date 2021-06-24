const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    create,
    getSigleById,
    getListById,
    remove,
    getMessageByType,
    update
} = require('../controller/order.controller.js')

const orderRouter = new Router({ prefix: '/order' });

orderRouter.post('/', verifyAuth, create);

orderRouter.get('/single/:id', getSigleById);
orderRouter.get('/list/:isfinish', verifyAuth, getListById);
// 消息部分
orderRouter.get('/message', verifyAuth, getMessageByType);
orderRouter.patch('/:id', verifyAuth, update);

// 1.用户必须登录 2.用户具备权限
orderRouter.delete('/:Id', verifyAuth, remove);

module.exports = orderRouter;