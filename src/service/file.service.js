const connection = require('../app/database');

class FileService {
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }

    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
        const [result] = await connection.execute(statement, [userId]);
        return result.pop();
    }

    async createFile(filename, mimetype, size, userId, lostFoundId) {
        const statement = `INSERT INTO file (filename, mimetype, size, user_id, lostfound_id) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, lostFoundId]);
        return result;
    }

    async getFileByFilename(filename) {
        const statement = `SELECT * FROM file WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }

    async getLostFoundId() {
        const statement = `SELECT id, user_id FROM lostfound where id=(select max(id) from lostfound);`;
        const [result] = await connection.execute(statement);
        return result[0];
    }

    // 二手交易
    async getSecondHandId() {
        const statement = `SELECT id, user_id FROM secondhand where id=(select max(id) from secondhand);`;
        const [result] = await connection.execute(statement);
        return result[0];
    }

    async createImage(filename, mimetype, size, secondHandId, userId) {
        const statement = `INSERT INTO secondhand_images (filename, mimetype, size, secondhand_id, user_id) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, secondHandId, userId]);
        return result;
    }

    async getImageByFilename(filename) {
        const statement = `SELECT * FROM secondhand_images WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}

module.exports = new FileService();