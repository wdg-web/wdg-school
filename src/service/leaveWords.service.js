const connection = require('../app/database');


class CommentService {
    async create(secondHandId, content, userId) {
        const statement = `INSERT INTO leave_words (content, secondhand_id, user_id) VALUES (?, ?, ?);`;
        `INSERT INTO comment SET ?`
        const [result] = await connection.execute(statement, [content, secondHandId, userId]);
        return result;
    }

    async reply(secondHandId, content, userId, leaveWordsId) {
        const statement = `INSERT INTO leave_words (content, secondhand_id, user_id, leave_words_id) VALUES (?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [content, secondHandId, userId, leaveWordsId]);
        return result;
    }

    async update(leaveWordsId, content) {
        const statement = `UPDATE leave_words SET content = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [content, leaveWordsId]);
        return result;
    }

    async remove(leaveWordsId) {
        const statement = `DELETE FROM leave_words WHERE id = ?`;
        const [result] = await connection.execute(statement, [leaveWordsId]);
        return result;
    }

    async getLeaveWordsBysecondHandId(secondHandId) {
        const statement = `
      SELECT 
        m.id, m.content, m.leave_words_id leaveWordsId, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user
      FROM leave_words m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE secondhand_id = ?;
    `;
        const [result] = await connection.execute(statement, [secondHandId]);
        return result;
    }
}

module.exports = new CommentService();