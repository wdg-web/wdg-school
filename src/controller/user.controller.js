const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const addressService = require('../service/address.service');
const { AVATAR_PATH } = require('../constants/file-path');
// const { log } = require('console');


class UserController {
    async create(ctx, next) {
        // 获取用户注册时传递的参数信息
        console.log('来到了注册处');
        const user = ctx.request.body;
        const isLogin = false;

        // 将用户信息加入数据库中
        const result = await userService.create(user);

        // 返回数据
        const massage = '您成功注册账号，请前往登录。';
        ctx.body = { isLogin, massage };
    }

    async avatarInfo(ctx, next) {
        // 1.用户的头像是哪一个文件呢?
        const { userId } = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);

        // 2.提供图像信息
        ctx.response.set('content-type', avatarInfo.mimetype);
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    }

    async userInfo(ctx, next) {
        const { userId } = ctx.params;
        const avatarInfo = await userService.getUserInfoByUserId(userId);
        ctx.body = avatarInfo;

    }

    // 用户保存收货地址
    async saveAddress(ctx, next) {
        console.log('来到了保存地址处');

        // 获取数据
        const userId = ctx.user.id;
        const username = ctx.request.body.username;
        const tel = ctx.request.body.tel;
        const user_address = ctx.request.body.user_address;
        const isdefault = ctx.request.body.isdefault;

        // 查询数据库表中是否有默认
        console.log(isdefault);
        console.log(isdefault == 1);
        if (isdefault == 1) {
            console.log('更新用户默认地址');
            const result0 = await addressService.updateIsDefaule(userId);
        };

        // 将数据插入到数据库
        const result = await addressService.create(username, tel, user_address, isdefault, userId);

        let message = '保存地址成功';
        let status = 200;
        ctx.body = { message: message, status: status }
    }

    // 用户更新收货地址
    async updateAddress(ctx, next) {
        console.log('010101010');
        console.log('来到了保存地址处');

        // 获取数据
        const userId = ctx.user.id;
        const id = ctx.request.body.id;
        const username = ctx.request.body.username;
        const tel = ctx.request.body.tel;
        const user_address = ctx.request.body.user_address;
        let isdefault = ctx.request.body.isdefault;

        // 查询数据库表中是否有默认
        console.log('00000000');
        console.log(user_address);
        console.log(isdefault);
        console.log(isdefault == 1);
        if (isdefault == 1) {
            console.log('更新用户默认地址');
            const result0 = await addressService.updateIsDefaule(userId);
        };

        // 将数据更新到数据库
        const result = await addressService.update(username, tel, user_address, isdefault, id);

        let message = '更新地址成功';
        let status = 200;
        console.log('123321');
        ctx.body = { message: message, status: status }
    }

    // 根据id删除地址
    async removeAddressById(ctx, next) {
        const { id } = ctx.params;

        const result = await addressService.remove(id);
        ctx.body = result;
    }

    // 根据用户id获取地址
    async getAddressById(ctx, next) {
        const userId = ctx.user.id;

        const result = await addressService.getAddressByUserId(userId);
        ctx.body = result;
    }
}

module.exports = new UserController();