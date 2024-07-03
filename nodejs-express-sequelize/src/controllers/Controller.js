class Controller {
  constructor(entityService) {
    this.entityService = entityService;
  }

  async getAll(req, res) {
    try {
      const result = await this.entityService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      // return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const register = await this.entityService.getById(Number(id));
      return res.status(200).json(register);
    } catch (erro) {
      // erro
    }
  }

  async create(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const createdRegister = await this.entityService.create(dadosParaCriacao);
      return res.status(200).json(createdRegister);
    } catch (erro) {
      // erro
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const isUpdated = await this.entityService.update(
        updatedData,
        Number(id)
      );
      if (!isUpdated) {
        return res.status(400).json({ message: "Registro não foi atualizado" });
      }
      return res
        .status(200)
        .json({ mensagem: "Registro atualizado com sucesso" });
    } catch (error) {
      // return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.entityService.delete(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Controller;
