const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const cryptoMd5 = require('../utils/password-handle');

const verifyUser = async(ctx, next) => {
    // 1.获取用户名和密码
    console.log(ctx.request.body);
    const { name, password } = ctx.request.body;
    const isLogin = false;

    // 2.判断用户名或者密码不能空
    if (!name || !password) {
        const massage = '用户名和密码不能为空，请输入！';
        ctx.body = { isLogin, massage };
        return;
    }

    // 3.判断此次注册的用户名是否被注册过
    const result = await service.getUserByName(name);
    if (result.length) {
        const massage = '该用户已存在，请注册其他账号！';
        ctx.body = { isLogin, massage };
        return
    }

    await next();
}

const cryptoPassword = async(ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = cryptoMd5(password)

    await next();
}

module.exports = {
    verifyUser,
    cryptoPassword
}