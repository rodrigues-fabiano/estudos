const dataSource = require("../database/models");
const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
    this.matriculaServices = new Services("Matricula");
  }

  async getMatriculasAtivasPorEstudante(id) {
    const estudante = await super.getById(id);
    const matriculas = await estudante.getAulasMatriculadas();

    return matriculas;
  }

  async getTodasMatriculasPorEstudante(id) {
    const estudante = await super.getById(id);
    const matriculas = await estudante.getTodasMatriculas();

    return matriculas;
  }

  async getPessoasByScope(scope) {
    const pessoas = await super.getAllByScope(scope);

    return pessoas;
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.update({ ativo: false }, { id: estudanteId }, transacao);
      await this.matriculaServices.update(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        transacao
      );
    });
  }
}

module.exports = PessoaServices;
