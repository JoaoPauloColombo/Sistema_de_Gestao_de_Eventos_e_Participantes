const Evento = require("../models/Evento");
const Participante = require("../models/Participante");

const ParticipanteController = {
  create: async (req, res) => {
    try {
      const { nome, email, eventoId } = req.body;

      // Verifica se já existe um participante com o mesmo email e eventoId
      const participanteExistente = await Participante.findOne({
        where: {
          email,
          eventoId,
        },
      });

      if (participanteExistente) {
        return res.status(400).json({
          msg: "Já existe um participante com esse email para esse evento",
        });
      }

      const participanteCriado = await Participante.create({ nome, email, eventoId });

      return res.status(200).json({
        msg: "Participante adicionado com sucesso!",
        user: participanteCriado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, eventoId } = req.body;

      console.log({ id });
      console.log({ nome, email, eventoId });

      const participanteUpdate = await Participante.findByPk(id);

      if (participanteUpdate == null) {
        return res.status(404).json({
          msg: "Participante nao encontrado",
        });
      }

      const updated = await participanteUpdate.update({
        nome, email, eventoId
      });
      if (updated) {
        return res.status(200).json({
          msg: "Participante atualizado com sucesso!",
        });
      }
      return res.status(500).json({
        msg: "Erro ao atualizar perfil do participante"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  getAll: async (req, res) => {
    try {
      const participantes = await Participante.findAll();
      return res.status(200).json({
        msg: "Participante Encontrados!",
        participantes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getEvento: async (req, res) => {
    try {
      const { eventoId } = req.params; // Extrai o ID do evento da URL

      // Busca o evento junto com os participantes relacionados
      const evento = await Evento.findOne({
        where: {
          id: eventoId, // Filtra pelo eventoId
        },
        include: [
          {
            model: Participante, // Inclui os participantes relacionados ao evento
            as: 'participantes', // Certifique-se de usar o alias correto se houver
          },
        ],
      });

      // Verifica se o evento foi encontrado
      if (!evento) {
        return res.status(404).json({ msg: "Evento não encontrado" });
      }

      // Retorna a lista de participantes do evento
      return res.status(200).json({
        msg: "Participantes do Evento!",
        participantes: evento.participantes, // Retorna apenas os participantes
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" }); // Tratamento de erros
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const participanteEncontrado = await Participante.findByPk(id);

      if (participanteEncontrado == null) {
        return res.status(404).json({
          msg: "Participante nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Participante Encontrados",
        usuario: participanteEncontrado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  // ParticipanteController.js
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const participanteFinded = await Participante.findByPk(id);

      if (participanteFinded == null) {
        return res.status(404).json({
          msg: "Participante nao encontrado",
        });
      }

      // Verifica se o participante ainda está associado a um evento
      const evento = await Evento.findByPk(participanteFinded.eventoId);

      if (evento) {
        return res.status(400).json({
          msg: "Não é possível excluir um participante que ainda está associado a um evento",
        });
      }

      await participanteFinded.destroy();

      return res.status(200).json({
        msg: "Participante deletado com sucesso",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
};

module.exports = ParticipanteController;
