import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, editoras, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find().populate("autor").populate("editora");

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id)
        .populate("autor")
        .populate("editora")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor")
          .populate("editora");

        req.resultado = livrosResultado;

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
  const {
    titulo,
    idEditora,
    nomeEditora,
    idAutor,
    nomeAutor,
    minPaginas,
    maxPaginas,
    minPreco,
    maxPreco,
  } = parametros;

  let busca = {};

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPreco) busca.preco = { $gte: minPreco };
  if (maxPreco) busca.preco = { $lte: maxPreco };
  if (minPaginas) busca.paginas = { $gte: minPaginas };
  if (maxPaginas) busca.paginas = { $lte: maxPaginas };
  if (idEditora) busca.editora = idEditora;
  if (idAutor) busca.editora = idAutor;

  if (nomeAutor) {
    const autor = await autores.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  if (nomeEditora) {
    const editora = await editoras.findOne({
      nome: { $regex: nomeEditora, $options: "i" },
    });

    console.log(editora);

    if (editora !== null) {
      busca.editora = editora._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
