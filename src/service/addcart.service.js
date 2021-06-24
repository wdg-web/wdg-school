const connection = require('../app/database');

class AddcartService {
    async create(pictrue_url, title, description, price, userId, secondhand_id, seller_id) {
        const statement = `INSERT INTO cart (pictrue_url, title, description, price, user_id, secondhand_id, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [pictrue_url, title, description, price, userId, secondhand_id, seller_id]);
        return result;
    }

    async getAddListById(userId) {
        const statement = `
        SELECT * FROM cart
        WHERE cart.user_id = ?; 
      `;
        try {
            const [result] = await connection.execute(statement, [userId]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async isExist(secondhand_id, userId) {
        const statement = `
        SELECT * FROM cart
        WHERE cart.user_id = ? AND cart.secondhand_id = ?; 
      `;
        try {
            const [result] = await connection.execute(statement, [userId, secondhand_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async remove(Id) {
        const statement = `
        DELETE FROM cart
        WHERE cart.id = ?;
      `;
        const [result] = await connection.execute(statement, [Id]);
        return result;
    }
}

module.exports = new AddcartService();