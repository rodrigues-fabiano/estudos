import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
      type: String,
      required: [true, "O campo NOME é obrigatório"],
    },
    cidade: { type: String },
  },
  {
    versionKey: false,
  }
);

const editoras = mongoose.model("editoras", editoraSchema);

export { editoras, editoraSchema };
