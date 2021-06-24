const { verify } = require('jsonwebtoken');
const Router = require('koa-router');

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware');
const {
    create,
    reply,
    update,
    remove,
    list
} = require('../controller/leaveWords.controller.js')

const leaveWordsRouter = new Router({ prefix: '/leaveWords' });

// 发表评论
leaveWordsRouter.post('/', verifyAuth, create);
// 回复
leaveWordsRouter.post('/:leavewordsId/reply', verifyAuth, reply);

// 修改评论
leaveWordsRouter.patch('/:leavewordsId', verifyAuth, verifyPermission, update);
// 删除评论
leaveWordsRouter.delete('/:leavewordsId', verifyAuth, verifyPermission, remove);

// 获取评论列表
leaveWordsRouter.get('/', list);

module.exports = leaveWordsRouter;