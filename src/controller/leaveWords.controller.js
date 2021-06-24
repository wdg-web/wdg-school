const leaveWordsservice = require('../service/leaveWords.service.js');

class LeaveWordsController {
    async create(ctx, next) {
        const { secondHandId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await leaveWordsservice.create(secondHandId, content, id);
        let message = '发表成功';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async reply(ctx, next) {
        console.log('二手回复');
        const { secondHandId, content } = ctx.request.body;
        const { leavewordsId } = ctx.params;
        const { id } = ctx.user;
        const result = await leaveWordsservice.reply(secondHandId, content, id, leavewordsId);
        let message = '已回复';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async update(ctx, next) {
        const { leavewordsId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await leaveWordsservice.update(leavewordsId, content);
        let message = '修改成功';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async remove(ctx, next) {
        const { leavewordsId } = ctx.params;
        const result = await leaveWordsservice.remove(leavewordsId);
        let message = '已成功删除';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async list(ctx, next) {
        console.log(ctx.query);
        const { secondHandId } = ctx.query;
        const result = await leaveWordsservice.getLeaveWordsBysecondHandId(secondHandId);
        ctx.body = result;
    }

}

module.exports = new LeaveWordsController();