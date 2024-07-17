const converteIds = require("../utils/conversorDeStringHelper.js");

class Controller {
  constructor(entityService) {
    this.entityService = entityService;
  }

  async getAll(req, res) {
    try {
      const result = await this.entityService.getAll();
      return res.status(200).json(result);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const register = await this.entityService.getById(Number(id));
      return res.status(200).json(register);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getOne(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const register = await this.entityService.getOne(where);
      return res.status(200).json(register);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async create(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const createdRegister = await this.entityService.create(dadosParaCriacao);
      return res.status(200).json(createdRegister);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async update(req, res) {
    const { ...params } = req.params;
    const updatedData = req.body;

    const where = converteIds(params);
    try {
      const isUpdated = await this.entityService.update(
        updatedData,
        where
      );
      if (!isUpdated) {
        return res.status(400).json({ message: "Registro não foi atualizado" });
      }
      return res
        .status(200)
        .json({ mensagem: "Registro atualizado com sucesso" });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.entityService.delete(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Controller;
