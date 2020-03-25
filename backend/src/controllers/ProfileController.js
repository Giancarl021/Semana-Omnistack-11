const connection = require('../database/connnection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        if(!ong_id) {
            return response.status(401).json({
                error: 'Operation Not Permited'
            })
        }

        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

        return response.json(incidents);
    }
};