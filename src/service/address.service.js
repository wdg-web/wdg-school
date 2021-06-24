const connection = require('../app/database');

class AddressService {
    // 保存用户地址部分
    async create(username, tel, user_address, isdefault, userId) {
        const statement = `INSERT INTO address (username, tel, user_address, isdefault, user_id) VALUES (?, ?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [username, tel, user_address, isdefault, userId]);
        return result;
    }

    async update(username, tel, user_address, isdefault, id) {
        const statement = `UPDATE address SET username = ?, tel = ?, user_address = ?, isdefault = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [username, tel, user_address, isdefault, id]);
        return result;
    }

    async updateIsDefaule(userId) {
        const statement = `UPDATE address SET isdefault = 0 WHERE user_id = ?`;
        const [result] = await connection.execute(statement, [userId]);
        return result;
    }

    async remove(id) {
        const statement = `DELETE FROM address WHERE id = ?`;
        const [result] = await connection.execute(statement, [id]);
        return result;
    }

    async getAddressByUserId(userId) {
        const statement = `
      SELECT 
        a.id, a.username name, a.tel, a.user_address address, a.isdefault isDefault, a.user_id userId
      FROM address a
      WHERE a.user_id = ?;
    `;
        const [result] = await connection.execute(statement, [userId]);
        return result;
    }


}

module.exports = new AddressService();