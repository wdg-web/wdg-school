const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const cryptoMd5 = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async(ctx, next) => {
    console.log("用户登录时验证登录信息");
    console.log(ctx.request.body);

    // 1.获取用户名和密码
    const { name, password } = ctx.request.body;
    const isLogin = false;

    // 2.判断用户名和密码是否为空
    if (!name || !password) {
        const massage = '用户名和密码不能为空，请输入！';
        ctx.body = { isLogin, massage };
        return;
    }

    // 3.判断用户是否存在的
    const result = await userService.getUserByName(name);
    const user = result[0];
    if (!user) {
        const massage = '用户不存在';
        ctx.body = { isLogin, massage };
        return
    }
    // 4.密码加密后，与数据库中的密码是一致
    if (cryptoMd5(password) !== user.password) {
        console.log('密码加密处');

        const massage = '密码不正确，请重新输入';
        ctx.body = { isLogin, massage };
        return
    }

    ctx.user = user;
    await next();
}

const verifyAuth = async(ctx, next) => {
    console.log("来到了验证授权处");
    // 1.获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }
    const token = authorization.replace('Bearer ', '');

    // 2.验证token获取用户信息
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
        ctx.user = result;
        console.log(ctx.user);
        await next();
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        ctx.app.emit('error', error, ctx);
    }
}

/**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */
const verifyPermission = async(ctx, next) => {
    console.log("验证权限的中间件");

    // 1.获取参数
    const [resourceKey] = Object.keys(ctx.params);
    let tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;
    console.log(tableName, resourceId, id);
    console.log(tableName == 'leavewords');
    if (tableName == 'leavewords') {
        tableName = 'leave_words';
    };
    console.log('000000');
    console.log(tableName, resourceId, id);

    // 2.查询是否具备权限
    try {
        console.log('验证是否是管理员');
        let role = 1;
        let isNext = true;
        const isRole = await authService.checkIsRole(id, role);
        console.log(isRole);
        if (isRole) {
            console.log('是管理员操作');
            isNext = false;
            await next();
        }
        if (isNext) {
            console.log('不是管理员，验证是否具备权限');
            const isPermission = await authService.checkResource(tableName, resourceId, id);
            if (!isPermission) throw new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
            await next();
        }

    } catch (err) {
        const error = new Error(errorTypes.UNPERMISSION);
        return ctx.app.emit('error', error, ctx);
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}