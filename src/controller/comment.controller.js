const service = require('../service/comment.service.js');

class CommentController {
    async create(ctx, next) {
        const { lostFoundId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await service.create(lostFoundId, content, id);
        let message = '发表成功';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async reply(ctx, next) {
        const { lostFoundId, content } = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } = ctx.user;
        const result = await service.reply(lostFoundId, content, id, commentId);
        let message = '已回复';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async update(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await service.update(commentId, content);
        let message = '修改成功';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params;
        const result = await service.remove(commentId);
        let message = '已成功删除';
        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async list(ctx, next) {
        console.log(ctx.query);
        const { lostFoundId } = ctx.query;
        const result = await service.getCommentsBylostFoundId(lostFoundId);
        ctx.body = result;
    }
}

module.exports = new CommentController();