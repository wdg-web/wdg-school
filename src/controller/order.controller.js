const service = require('../service/order.service');

class OrderController {
    async create(ctx, next) {
        console.log('来到了加入购物车处');

        // 获取信息
        const isfinish = 0;
        const address_id = ctx.request.body.address_id;
        const ishandle = 0;
        const buyer_id = ctx.user.id;
        const secondhand_id = ctx.request.body.secondhand_id;
        const seller_id = ctx.request.body.seller_id;

        const result0 = await service.isExist(secondhand_id, buyer_id);
        const cartlist = result0[0];
        if (cartlist) {
            const message = '您已加入订单中，请勿重复加入！';
            ctx.body = { message };
            return
        }

        const result = await service.create(isfinish, address_id, ishandle, buyer_id, seller_id, secondhand_id);

        const result1 = await service.createId(buyer_id, secondhand_id);
        ctx.body = result1;
    }

    async getSigleById(ctx, next) {
        // 获取id数据
        const id = ctx.params.id;
        console.log("获取单条订单数据");

        // 根据id去查询这条数据
        const result = await service.getSigleById(id);
        ctx.body = result;
    }
    async getListById(ctx, next) {
        // 获取用户数据
        const isfinish = ctx.params.isfinish;
        const buyer_id = ctx.user.id;
        console.log("获取订单列表数据");

        // 根据id去查询这条数据
        const result = await service.getListById(isfinish, buyer_id);
        ctx.body = result;
    }

    async getMessageByType(ctx, next) {
        // 获取用户数据
        const { type, typeValue } = ctx.query;
        const buyer_id = ctx.user.id;
        console.log(type);
        console.log(typeValue);
        console.log("获取订单消息");

        // 根据id去查询这条数据
        const result = await service.getListByType(type, typeValue, buyer_id);
        ctx.body = result;
    }

    async update(ctx, next) {
        const { id } = ctx.params;
        const { type, typeValue } = ctx.request.body;
        const result = await service.update(id, type, typeValue);
        let message;
        if (type == 'isfinish') {
            message = '已确认收货';
        } else {
            message = '已成功接单';
        }

        let status = 200;
        ctx.body = { message: message, status: status };
    }

    async remove(ctx, next) {
        const { Id } = ctx.params;

        const result = await service.remove(Id);
        ctx.body = { message: '已成功删除', status: 200 };
    }
}

module.exports = new OrderController();