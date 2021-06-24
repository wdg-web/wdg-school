const connection = require('../app/database');
// const commentRouter = require('../router/comment.router');

class CommentService {
    async create(lostFoundId, content, userId) {
        const statement = `INSERT INTO comment (content, lostfound_id, user_id) VALUES (?, ?, ?);`;
        `INSERT INTO comment SET ?`
        const [result] = await connection.execute(statement, [content, lostFoundId, userId]);
        return result;
    }

    async reply(lostFoundId, content, userId, commentId) {
        const statement = `INSERT INTO comment (content, lostfound_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [content, lostFoundId, userId, commentId]);
        return result;
    }

    async update(commentId, content) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [content, commentId]);
        return result;
    }

    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id = ?`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }

    async getCommentsBylostFoundId(lostFoundId) {
        const statement = `
      SELECT 
        m.id, m.content, m.comment_id commentId, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE lostfound_id = ?;
    `;
        const [result] = await connection.execute(statement, [lostFoundId]);
        return result;
    }
}

module.exports = new CommentService();