const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

      if(!ong) {
        return response.status(404).json({ error: 'Ong não encontrada com essa identificação.'});
      }

      return response.json(ong);
  }
}