const connection = require('../app/database');

class lostFoundService {
    async create(userId, content, type, classify, telphone, place, findTime) {
        const statement = `INSERT INTO lostfound (content, user_id, type, classify, telphone, place, find_time) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [content, userId, type, classify, telphone, place, findTime]);
        return result;
    }

    async getlostFoundById(id) {
        const statement = `
      SELECT 
        m.id id, m.content content, m.type type, m.classify classify, m.telphone telphone, m.place place,  m.find_time findTime, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.lostfound_id) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/lostFound/images/', file.filename)) 
        FROM file WHERE m.id = file.lostfound_id) images
      FROM lostFound m 
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?
      GROUP BY m.id;  
    `;
        try {
            const [result] = await connection.execute(statement, [id]);
            return result[0];
        } catch (error) {
            console.log(error)
        }
    }

    async getlostFoundList(type, offset, size) {
        const statement = `
      SELECT 
        m.id id, m.content content, m.type type, m.classify classify, m.telphone telphone, m.place place, m.find_time findTime, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.lostfound_id = m.id) commentCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/lostFound/images/', file.filename)) 
        FROM file WHERE m.id = file.lostfound_id) images
      FROM lostFound m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.type = ?
      LIMIT ?, ?;
    `;
        try {
            const [result] = await connection.execute(statement, [type, offset, size]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async getlostFoundListByUserId(userId) {
        const statement = `
      SELECT 
        m.id id, m.content content, m.type type, m.classify classify, m.telphone telphone, m.place place, m.find_time findTime, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.lostfound_id = m.id) commentCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/lostFound/images/', file.filename)) 
        FROM file WHERE m.id = file.lostfound_id) images
      FROM lostFound m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.user_id = ?;
    `;
        try {
            const [result] = await connection.execute(statement, [userId]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async update(content, lostFoundId) {
        const statement = `UPDATE lostFound SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, lostFoundId]);
        return result;
    }

    async remove(lostFoundId) {
        const statement = `DELETE FROM lostFound WHERE id = ?`;
        const [result] = await connection.execute(statement, [lostFoundId]);
        return result;
    }

    async search(keyword, type) {
        const statement = `
      SELECT 
        m.id id, m.content content, m.type type, m.classify classify, m.telphone telphone, m.place place, m.find_time findTime, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.lostfound_id = m.id) commentCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/lostFound/images/', file.filename)) 
        FROM file WHERE m.id = file.lostfound_id) images
      FROM lostFound m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.content like  '%${keyword}%' AND m.type = ? ;
    `;
        try {
            console.log('来到了搜索处');
            const [result] = await connection.execute(statement, [type]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new lostFoundService();