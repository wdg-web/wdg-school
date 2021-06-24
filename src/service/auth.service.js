const connection = require('../app/database');

class AuthService {
    async checkResource(tableName, id, userId) {
        console.log('不是管理员，判断是否是本人发布');
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
        const [result] = await connection.execute(statement, [id, userId]);
        console.log(result);
        return result.length === 0 ? false : true;
    }

    async checkIsRole(userId, role) {
        console.log('判断是否是管理员');
        const statement = `select id, role from 
        user  where id= ? AND role = ?;`;
        const [result] = await connection.execute(statement, [userId, role]);
        console.log(result);
        console.log(result.length);
        return result.length === 0 ? false : true;
    }
}

module.exports = new AuthService();