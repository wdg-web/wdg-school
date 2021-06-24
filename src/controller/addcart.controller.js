const service = require('../service/addcart.service');

class AddcartController {
    async create(ctx, next) {
        console.log('来到了加入购物车处');

        // 获取信息
        const userId = ctx.user.id;
        const pictrue_url = ctx.request.body.pictrue_url;
        const title = ctx.request.body.title;
        const description = ctx.request.body.description;
        const price = ctx.request.body.price;
        const secondhand_id = ctx.request.body.secondhand_id;
        const seller_id = ctx.request.body.seller_id;


        const result0 = await service.isExist(secondhand_id, userId);
        const cartlist = result0[0];
        if (cartlist) {
            const message = '您已加入购物车，请勿重复加入！';
            ctx.body = { message };
            return
        }

        const result = await service.create(pictrue_url, title, description, price, userId, secondhand_id, seller_id);

        let message = '已成功加入购物车';
        let status = 200;
        ctx.body = { message: message, status: status }
    }

    async getListById(ctx, next) {
        // 获取购物车数据
        const userId = ctx.params.userId;
        console.log("获取单条二手交易数据");

        // 根据id去查询这条数据
        const result = await service.getAddListById(userId);
        ctx.body = result;
    }

    async remove(ctx, next) {
        const { Id } = ctx.params;

        const result = await service.remove(Id);
        ctx.body = { message: '已成功删除', status: 200 };
    }
}

module.exports = new AddcartController();