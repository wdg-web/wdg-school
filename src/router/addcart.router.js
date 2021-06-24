const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    create,
    getListById,
    remove
} = require('../controller/addcart.controller.js')

const addcartRouter = new Router({ prefix: '/addcart' });

addcartRouter.post('/', verifyAuth, create);

addcartRouter.get('/:userId', getListById);

// 1.用户必须登录 2.用户具备权限
addcartRouter.delete('/:Id', verifyAuth, remove);

module.exports = addcartRouter;