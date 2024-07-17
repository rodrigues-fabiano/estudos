"use strict";
const isCpfValido = require("../../utils/validaCpfHelper.js");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: "docente_id",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        scope: { status: "matriculado" },
        as: "aulasMatriculadas",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        as: "todasMatriculas",
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 30],
            msg: "Campo nome deve ter entre 3 e 30 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Email inválido",
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfValido: (cpf) => {
            if (!isCpfValido(cpf)) throw new Error("CPF inválido");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoa",
      tableName: "pessoas",
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        todos: {
          where: {},
        },
        estudantes: {
          where: {
            role: "estudante",
          },
        },
        professores: {
          where: {
            role: "docente",
          },
        },
      },
    }
  );
  return Pessoa;
};
