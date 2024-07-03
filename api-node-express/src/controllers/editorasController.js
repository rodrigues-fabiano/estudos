import NaoEncontrado from "../errors/NaoEncontrado.js";
import { editoras } from "../models/index.js";

class EditoraController {
  static listarEditoras = async (req, res, next) => {
    try {
      const editorasResultado = editoras.find();

      req.resultado = editorasResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarEditoraPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const editoraResultados = await editoras.findById(id);

      if (editoraResultados !== null) {
        res.status(200).send(editoraResultados);
      } else {
        next(new NaoEncontrado("Editora não localizada"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarEditora = async (req, res, next) => {
    try {
      let editora = new editoras(req.body);

      const editoraResultado = await editora.save();

      res.status(201).send(editoraResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarEditora = async (req, res, next) => {
    try {
      const id = req.params.id;

      const editoraResultado = await editoras.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (editoraResultado !== null) {
        res.status(200).send({ message: "Editora atualizada com sucesso" });
      } else {
        next(new NaoEncontrado("Editora não localizada"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirEditora = async (req, res, next) => {
    try {
      const id = req.params.id;

      const editoraResultado = await editoras.findByIdAndDelete(id);

      if (editoraResultado !== null) {
        res.status(200).send({ message: "Editora removida com sucesso" });
      } else {
        next(new NaoEncontrado("Editora não localizada"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarEditoraPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const editoraResultado = editoras.find(busca);

        req.resultado = editoraResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { nome, cidade } = parametros;

  let busca = {};

  if (nome) busca.nome = { $regex: nome, $options: "i" };
  if (cidade) busca.cidade = { $regex: cidade, $options: "i" };

  return busca;
}

export default EditoraController;
