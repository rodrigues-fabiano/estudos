import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, "O campo TITULO é obrigatório"],
  },
  editora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "editoras",
    required: [true, "O campo EDITORA é obrigatório"],
  },
  preco: {
    type: Number,
    min: 0,
  },
  paginas: {
    type: Number,
    min: [10, "O livro deve ter entre 10 e 5000 páginas"],
    max: [5000, "O livro deve ter entre 10 e 5000 páginas"],
    // validate: {
    //   validator: (valor) => valor >= 10 && valor <= 5000,
    //   message:
    //     "O livro deve ter entre 10 e 5000 páginas. Valor fornecido: {VALUE}",
    // },
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O campo AUTOR é obrigatório"],
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
