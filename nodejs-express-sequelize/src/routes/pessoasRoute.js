const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");
const MatriculaController = require("../controllers/MatriculaController.js");

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get("/pessoas", (req, res) => pessoaController.getAll(req, res));
router.get("/pessoas/:scope", (req, res) =>
pessoaController.getPessoasByScope(req, res)
);
router.get("/pessoas/:id", (req, res) => pessoaController.getById(req, res));
router.post("/pessoas", (req, res) => pessoaController.create(req, res));
router.put("/pessoas/:id", (req, res) => pessoaController.update(req, res));
router.put("/pessoas/:estudante_id/cancela", (req, res) =>
  pessoaController.cancelaRegistroEstudante(req, res)
);
router.delete("/pessoas/:id", (req, res) => pessoaController.delete(req, res));
router.get("/pessoas/:estudante_id/matriculas", (req, res) =>
  pessoaController.getMatriculasAtivas(req, res)
);
router.get("/pessoas/:estudante_id/matriculas/todos", (req, res) =>
  pessoaController.getAllMatriculas(req, res)
);
router.get("/pessoas/:estudante_id/matriculas/confirmadas", (req, res) =>
  matriculaController.getMatriculasPorEstudante(req, res)
);
router.get("/pessoas/matriculas/lotadas", (req, res) =>
  matriculaController.getCursosLotados(req, res)
);
router.get("/pessoas/:estudante_id/matriculas/:id", (req, res) =>
  matriculaController.getOne(req, res)
);
router.post("/pessoas/:estudante_id/matriculas", (req, res) =>
  matriculaController.create(req, res)
);
router.put("/pessoas/:estudante_id/matriculas/:id", (req, res) =>
  matriculaController.update(req, res)
);
router.delete("/pessoas/:estudante_id/matriculas/:id", (req, res) =>
  matriculaController.delete(req, res)
);

module.exports = router;
