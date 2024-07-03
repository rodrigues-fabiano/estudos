const dataSource = require("../models");

class Services {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return dataSource[this.model].findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async create(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async update(data, id) {
    const updatedDataArray = dataSource[this.model].update(data, {
      where: { id },
    });
    if (updatedDataArray[0] === 0) return false;
    return true;
  }

  async delete(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
