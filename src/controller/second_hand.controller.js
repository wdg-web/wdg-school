const fs = require('fs');

const fileService = require('../service/file.service');
const secondHandService = require('../service/second_hand.service');
const { IMAGE_PATH } = require('../constants/file-path');

class secondHandController {
    async create(ctx, next) {
        console.log('来到了创建二手信息处');

        // 获取数据(user_id, content)
        const userId = ctx.user.id;
        const description = ctx.request.body.description;
        const price = ctx.request.body.price;
        const classify = ctx.request.body.classify;
        const site = ctx.request.body.site;
        const telphone = ctx.request.body.telphone;
        const keyword = ctx.request.body.keyword;

        // 将数据插入到数据库
        const result = await secondHandService.create(description, userId, price, classify, site, telphone, keyword);

        let message = '发表成功';
        let status = 200;
        ctx.body = { message: message, status: status }
    }

    async list(ctx, next) {
        const { classify } = ctx.query;

        const result = await secondHandService.secondHandList(classify);
        ctx.body = result;
    }
    async listByUserId(ctx, next) {
        const userId = ctx.user.id;
        console.log("来到了获取发布二手交易处");
        console.log(userId);

        const result = await secondHandService.listByUserId(userId);
        ctx.body = result;
    }

    async search(ctx, next) {
        const { keyword } = ctx.query;
        // 查询内容
        const result = await secondHandService.search(keyword);
        ctx.body = result;
    }

    async listBytime(ctx, next) {
        const result = await secondHandService.getSecondHandListBytime();
        ctx.body = result;
    }

    async single(ctx, next) {
        const secondHandId = ctx.params.secondHandId;
        console.log(secondHandId);
        console.log("single");
        console.log("获取单条二手交易数据");

        // 根据id去查询这条数据
        const result = await secondHandService.secondHandById(secondHandId);
        ctx.body = result;
    }

    async remove(ctx, next) {
        // 获取lostFoundId
        const { secondHandId } = ctx.params;

        // 删除内容
        const result = await secondHandService.remove(secondHandId);
        ctx.body = { message: '成功删除', status: 200 };
    }

    async fileInfo(ctx, next) {
        let { filename } = ctx.params;
        const fileInfo = await fileService.getImageByFilename(filename);
        const { type } = ctx.query;
        const types = ["small", "middle", "large"];
        if (types.some(item => item === type)) {
            filename = filename + '-' + type;
        }

        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${IMAGE_PATH}/${filename}`);
    }

    async startOrder(ctx, next) {
        console.log('来到了发起订单处');

        // 1.获取信息
        const userId = ctx.user.id;
        const isfinish = ctx.request.body.isfinish;
        const address_id = ctx.request.body.address_id;
        const ishandle = ctx.request.body.ishandle;
        const seller_id = ctx.request.body.seller_id;
        const buyer_address = ctx.request.body.telphone;

        // 2.将数据插入到数据库
        const result = await secondHandService.startOrder(isfinish, address_id, ishandle, seller_id, buyer_address, userId);

        let message = '以成功发起订单';
        let status = 200;
        ctx.body = { message: message, status: status }
    }

}

module.exports = new secondHandController();