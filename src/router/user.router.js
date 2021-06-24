const Router = require('koa-router');
const {
    create,
    avatarInfo,
    userInfo,
    saveAddress,
    updateAddress,
    removeAddressById,
    getAddressById
} = require('../controller/user.controller');
const {
    verifyUser,
    cryptoPassword
} = require('../middleware/user.middleware');
const {
    verifyAuth,
} = require('../middleware/auth.middleware');

const userRouter = new Router({ prefix: '/users' });

userRouter.post('/', verifyUser, cryptoPassword, create);
// verifyUser：验证用户信息是否为空是否用户名已存在等
// cryptoPassword:  将用户密码加密后存入数据库

userRouter.get('/:userId/avatar', avatarInfo);
userRouter.get('/:userId/userinfo', userInfo);


// 保存地址
userRouter.post('/saveAddress', verifyAuth, saveAddress)
    // 更新地址
userRouter.patch('/updateAddress', verifyAuth, updateAddress)
    // 删除用户地址
userRouter.delete('/removeAddress/:id', verifyAuth, removeAddressById)
    // 获取地址
userRouter.get('/getAddress', verifyAuth, getAddressById)

module.exports = userRouter;