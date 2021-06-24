const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { AVATAR_PATH } = require('../constants/file-path');
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
    async saveAvatarInfo(ctx, next) {
        console.log(ctx.req.file);
        const { filename, mimetype, size } = ctx.req.file;
        const { id } = ctx.user;

        // 将图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id);

        // 图片地址保存到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        await userService.updateAvatarUrlById(avatarUrl, id);

        ctx.body = '上传头像成功~';
    }

    async savePictureInfo(ctx, next) {
        // 1.获取配图信息
        const files = ctx.req.files;
        console.log('保存图片参数');
        console.log(files);

        const { id } = ctx.user;
        // const { lostFoundId } = ctx.query;

        let result = await fileService.getLostFoundId();
        console.log(result);
        const userId = result.user_id;
        console.log(userId);
        let lostFoundId;
        if (userId == id) {
            lostFoundId = result.id;
        }

        for (let file of files) {
            const { filename, mimetype, size } = file;
            await fileService.createFile(filename, mimetype, size, id, lostFoundId);
        }

        ctx.body = '动态配图上传完成~'
    }

    async saveImageInfo(ctx, next) {
        // 1.获取配图信息
        const files = ctx.req.files;
        console.log('保存二手图片参数');
        console.log(files);

        const { id } = ctx.user;

        let result = await fileService.getSecondHandId();
        console.log(result);
        const userId = result.user_id;
        console.log(userId);
        let secondHandId;
        if (userId == id) {
            secondHandId = result.id;
        }

        for (let file of files) {
            const { filename, mimetype, size } = file;
            await fileService.createImage(filename, mimetype, size, secondHandId, id);
        }

        ctx.body = '动态配图上传完成~'
    }
}

module.exports = new FileController();