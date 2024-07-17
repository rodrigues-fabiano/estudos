const dataSource = require("../database/models");

class Services {
  constructor(model) {
    this.model = model;
  }

  async getAll(where = {}) {
    try {
      return dataSource[this.model].findAll({ where: { ...where } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllByScope(scope) {
    try {
      return dataSource[this.model].scope(scope).findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async getOne(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  async getAndCountAll(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async create(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async update(data, where, transacao = {}) {
    const updatedDataArray = dataSource[this.model]
    .update(data, {
      where: { ...where },
      transaction: transacao,
    });
    if (updatedDataArray[0] === 0) return false;
    return true;
  }

  async delete(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
