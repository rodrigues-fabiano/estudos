const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async getMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;
    try {
      const matriculas = await pessoaServices.getMatriculasAtivasPorEstudante(
        Number(estudante_id)
      );
      return res.status(200).json(matriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getAllMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const matriculas = await pessoaServices.getTodasMatriculasPorEstudante(
        Number(estudante_id)
      );
      return res.status(200).json(matriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getPessoasByScope(req, res) {
    const scope = req.params.scope;
    try {
      const pessoas = await pessoaServices.getPessoasByScope(scope);
      return res.status(200).json(pessoas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async cancelaRegistroEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({ message: `matrículas ref. estudante ${estudante_id} canceladas` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}


module.exports = PessoaController;
