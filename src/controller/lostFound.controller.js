const fs = require('fs');

const fileService = require('../service/file.service');
const lostFoundService = require('../service/lostFound.service');
const { PICTURE_PATH } = require('../constants/file-path');

class lostFoundController {
    async create(ctx, next) {
        // 获取数据(user_id, content)
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        const type = ctx.request.body.type;
        const classify = ctx.request.body.classify;
        const telphone = ctx.request.body.telphone;
        const place = ctx.request.body.place;
        const findTime = ctx.request.body.findtime;

        // 将数据插入到数据库
        const result = await lostFoundService.create(userId, content, type, classify, telphone, place, findTime);

        let message = '发表成功';
        let status = 200;
        ctx.body = { message: message, status: status }
    }

    async detail(ctx, next) {
        // 获取数据(lostFoundId)
        const lostFoundId = ctx.params.lostFoundId;

        // 根据id去查询这条数据
        const result = await lostFoundService.getlostFoundById(lostFoundId);
        ctx.body = result;
    }

    async list(ctx, next) {
        // 获取数据(offset/size)
        const { offset, size, type } = ctx.query;

        // 查询列表
        const result = await lostFoundService.getlostFoundList(type, offset, size);
        ctx.body = result;
    }

    async getListByUserId(ctx, next) {
        // 获取数据
        const userId = ctx.user.id;

        // 查询列表
        const result = await lostFoundService.getlostFoundListByUserId(userId);
        ctx.body = result;
    }

    async update(ctx, next) {
        // 获取参数
        const { lostFoundId } = ctx.params;
        const { content } = ctx.request.body;

        // 修改内容
        const result = await lostFoundService.update(content, lostFoundId);
        ctx.body = result;
    }

    async remove(ctx, next) {
        const { lostFoundId } = ctx.params;

        // 删除内容
        const result = await lostFoundService.remove(lostFoundId);
        ctx.body = { message: '成功删除', status: 200 };
    }

    async search(ctx, next) {
        const { keyword, type } = ctx.query;

        // 查询内容
        const result = await lostFoundService.search(keyword, type);
        ctx.body = result;
    }

    async fileInfo(ctx, next) {
        let { filename } = ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename);
        const { type } = ctx.query;
        const types = ["small", "middle", "large"];
        if (types.some(item => item === type)) {
            filename = filename + '-' + type;
        }

        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    }
}

module.exports = new lostFoundController();