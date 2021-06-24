const connection = require('../app/database');

class OrderService {
    async create(isfinish, address_id, ishandle, buyer_id, seller_id, secondhand_id) {
        const statement = `INSERT INTO user_order (isfinish, address_id, ishandle, buyer_id, seller_id,  secondhand_id) VALUES (?, ?, ?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [isfinish, address_id, ishandle, buyer_id, seller_id, secondhand_id]);
        return result;
    }

    async createId(buyer_id, secondhand_id) {
        const statement = `
        SELECT id, secondhand_id FROM user_order
        WHERE user_order.buyer_id = ? AND user_order.secondhand_id = ?; 
      `;
        try {
            const [result] = await connection.execute(statement, [buyer_id, secondhand_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async getSigleById(Id) {
        const statement = `
        SELECT m.id id, m.isfinish isfinish, m.address_id address_id, m.ishandle ishandle, m.buyer_id buyer_id, m.seller_id seller_id, m.createAt createAt, m.updateAt updateAt, 
            JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
            JSON_OBJECT('id', a.id, 'username', a.username, 'tel', a.tel, 'user_address', a.user_address) buyerInfo,
            JSON_OBJECT('id', s.id, 'description', s.description, 'price', s.price, 'keyword', s.keyword) secondhand,
                (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
            FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
        FROM user_order m
        LEFT JOIN user u ON m.buyer_id = u.id
        LEFT JOIN address a ON m.address_id = a.id
        LEFT JOIN secondhand s ON m.secondhand_id = s.id
        WHERE m.id = ?;  
      `;
        try {
            const [result] = await connection.execute(statement, [Id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async getListById(isfinish, buyer_id) {
        const statement = `
    SELECT m.id id, m.isfinish isfinish, m.address_id address_id, m.ishandle ishandle, m.buyer_id buyer_id, m.seller_id seller_id, m.createAt createAt, m.updateAt updateAt, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        JSON_OBJECT('id', a.id, 'username', a.username, 'tel', a.tel, 'user_address', a.user_address) buyerInfo,
        JSON_OBJECT('id', s.id, 'description', s.description, 'price', s.price, 'keyword', s.keyword) secondhand,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
    FROM user_order m
    LEFT JOIN user u ON m.buyer_id = u.id
    LEFT JOIN address a ON m.address_id = a.id
    LEFT JOIN secondhand s ON m.secondhand_id = s.id
    WHERE m.isfinish = ? AND m.buyer_id = ?;  
      `;
        try {
            const [result] = await connection.execute(statement, [isfinish, buyer_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async isExist(secondhand_id, buyer_id) {
        const statement = `
        SELECT * FROM user_order
        WHERE user_order.buyer_id = ? AND user_order.secondhand_id = ?; 
      `;
        try {
            const [result] = await connection.execute(statement, [buyer_id, secondhand_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async getListByType(type, typeValue, buyer_id) {
        const statement = `
    SELECT m.id id, m.isfinish isfinish, m.address_id address_id, m.ishandle ishandle, m.buyer_id buyer_id, m.seller_id seller_id, m.createAt createAt, m.updateAt updateAt, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        JSON_OBJECT('id', a.id, 'username', a.username, 'tel', a.tel, 'user_address', a.user_address) buyerInfo,
        JSON_OBJECT('id', s.id, 'description', s.description, 'price', s.price, 'keyword', s.keyword) secondhand,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
    FROM user_order m
    LEFT JOIN user u ON m.buyer_id = u.id
    LEFT JOIN address a ON m.address_id = a.id
    LEFT JOIN secondhand s ON m.secondhand_id = s.id
    WHERE m.${type} = ? AND m.seller_id = ?;  
      `;
        try {
            const [result] = await connection.execute(statement, [typeValue, buyer_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, type, typeValue) {
        const statement = `UPDATE user_order SET ${type} = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [typeValue, id]);
        return result;
    }

    async isExist(secondhand_id, buyer_id) {
        const statement = `
        SELECT * FROM user_order
        WHERE user_order.buyer_id = ? AND user_order.secondhand_id = ?; 
      `;
        try {
            const [result] = await connection.execute(statement, [buyer_id, secondhand_id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async remove(Id) {
        const statement = `
        DELETE FROM user_order
        WHERE user_order.id = ?;
      `;
        const [result] = await connection.execute(statement, [Id]);
        return result;
    }
}

module.exports = new OrderService();