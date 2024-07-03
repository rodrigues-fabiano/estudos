const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
  }

  async getMatriculasPorEstudante(id) {
    const estudante = await super.getById(id);
    const matriculas = await estudante.getAulasMatriculadas();

    return matriculas;
  }
}

module.exports = PessoaServices;
