const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async getAllMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const matriculas = await pessoaServices.getMatriculasPorEstudante(
        Number(estudanteId)
      );
      return res.status(200).json(matriculas);
    } catch (error) {
      // res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PessoaController;
