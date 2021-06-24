const connection = require('../app/database');

class secondHandService {
    async create(description, userId, price, classify, site, telphone, keyword) {
        const statement = `INSERT INTO secondhand (description, user_id, price, classify, site, telphone, keyword) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [description, userId, price, classify, site, telphone, keyword]);
        return result;
    }

    async secondHandList(classify) {
        const statement = `
        SELECT 
        s.id id, s.description description, s.user_id userId, s.price price, s.classify classify,  s.site site, s.telphone telphone, s.keyword keyword, s.createAt createTime, s.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
      FROM secondhand s
      LEFT JOIN user u ON u.id = s.user_id
      WHERE s.classify = ?;
    `;
        try {
            const [result] = await connection.execute(statement, [classify]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async listByUserId(userId) {
        const statement = `
        SELECT 
        s.id id, s.description description, s.user_id userId, s.price price, s.classify classify,  s.site site, s.telphone telphone, s.keyword keyword, s.createAt createTime, s.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
      FROM secondhand s
      LEFT JOIN user u ON u.id = s.user_id
      WHERE s.user_id = ?;
    `;
        try {
            const [result] = await connection.execute(statement, [userId]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async getSecondHandListBytime() {
        const statement = `
        SELECT 
        s.id id, s.description description, s.user_id userId, s.price price, s.classify classify,  s.site site, s.telphone telphone, s.keyword keyword, s.createAt createTime, s.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
      FROM secondhand s
      LEFT JOIN user u ON u.id = s.user_id
      ORDER BY s.updateAt desc, s.id desc;
    `;
        try {
            const [result] = await connection.execute(statement);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async search(keyword) {
        const statement = `
        SELECT 
        s.id id, s.description description, s.user_id userId, s.price price, s.classify classify,  s.site site, s.telphone telphone, s.keyword keyword, s.createAt createTime, s.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
      FROM secondhand s
      LEFT JOIN user u ON u.id = s.user_id
      WHERE s.description like '%${keyword}%' ;
    `;
        try {
            const [result] = await connection.execute(statement, [keyword]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async secondHandById(secondHandId) {
        const statement = `
        SELECT 
        s.id id, s.description description, s.user_id userId, s.price price, s.classify classify,  s.site site, s.telphone telphone, s.keyword keyword, s.createAt createTime, s.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/secondHand/images/', secondhand_images.filename)) 
        FROM secondhand_images WHERE s.id = secondhand_images.secondhand_id) images
      FROM secondhand s
      LEFT JOIN user u ON u.id = s.user_id
      WHERE s.id = ?;
    `;
        try {
            const [result] = await connection.execute(statement, [secondHandId]);
            return result[0];
        } catch (error) {
            console.log(error)
        }
    }

    async remove(secondHandId) {
        const statement = `DELETE FROM secondhand WHERE id = ?`;
        const [result] = await connection.execute(statement, [secondHandId]);
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

}

module.exports = new secondHandService();