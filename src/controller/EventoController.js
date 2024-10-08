const Evento = require("../models/Evento");
const Participante = require("../models/Participante");

const EventoController = {
  create: async (req, res) => {
    try {
      const { nome, data, localizacao } = req.body;

      const eventoCriado = await Evento.create({ nome, data, localizacao });

      return res.status(200).json({
        msg: "Evento criado com sucesso!",
        user: eventoCriado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, data, localizacao } = req.body;

      console.log({ id });
      console.log({ nome, data, localizacao });

      const eventoUpdate = await Evento.findByPk(id);

      if (eventoUpdate == null) {
        return res.status(404).json({
          msg: "Evento nao encontrado",
        });
      }

      const updated = await eventoUpdate.update({
        nome, data, localizacao
      });
      if (updated) {
        return res.status(200).json({
          msg: "Evento atualizado com sucesso!",
        });
      }
      return res.status(500).json({
        msg: "Erro ao atualizar evento"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  getAll: async (req, res) => {
    try {
      const eventos = await Evento.findAll();
      return res.status(200).json({
        msg: "Eventos Encontrados!",
        eventos,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getParticipante: async (req, res) => {
    try {
      const { id } = req.params; // Extrai o ID do evento da URL

      // Busca os participantes relacionados ao evento específico
      const participantes = await Participante.findAll({
        where: {
          eventoId: id, // Filtra pelo eventoId fornecido
        },
      });

      // Verifica se há participantes encontrados
      if (participantes.length === 0) {
        return res.status(404).json({ msg: "Nenhum participante encontrado para este evento." });
      }

      // Retorna a lista de participantes com mensagem de sucesso
      return res.status(200).json({
        msg: "Participantes do Evento!",
        participantes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" }); // Tratamento de erros
    }
  },


  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const eventoEncontrado = await Evento.findByPk(id);

      if (eventoEncontrado == null) {
        return res.status(404).json({
          msg: "Evento nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Evento Encontrados",
        usuario: eventoEncontrado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
  // EventoController.js
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Exclui o evento e todos os participantes associados a ele
      await Evento.destroy({
        where: {
          id,
        },
        include: [
          {
            model: Participante,
            as: "participantes",
          },
        ],
      });

      return res.status(200).json({
        msg: "Evento excluído com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
};

module.exports = EventoController;
