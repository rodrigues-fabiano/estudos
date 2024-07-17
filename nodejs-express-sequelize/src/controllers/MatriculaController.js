const Controller = require("./Controller.js");
const MatriculaServices = require("../services/MatriculaServices.js");
const Sequelize = require("sequelize");

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async getMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculasPorEstudante =
        await matriculaServices.getAndCountAll({
          where: {
            estudante_id: Number(estudante_id),
            status: "matriculado",
          },
          limit: 2,
          order: [["id", "DESC"]],
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getCursosLotados(req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.getAndCountAll({
        where: {
          status: "matriculado",
        },
        attributes: ["curso_id"],
        group: ["curso_id"],
        having: Sequelize.literal(`COUNT(curso_id) >= ${lotacaoCurso}`),
      });
      return res.status(200).json(cursosLotados.count);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
