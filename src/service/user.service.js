const connection = require('../app/database');

class UserService {
    // 注册用户
    async create(user) {
        const { name, password } = user;
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]);

        return result[0];
    }

    // 查询用户名是否已经被注册过
    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);

        return result[0];
    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
    async getUserInfoByUserId(userId) {
        const statement = `SELECT name, avatar_url FROM user WHERE id = ?`;
        const [result] = await connection.execute(statement, [userId]);
        return result;
    }

}

module.exports = new UserService();