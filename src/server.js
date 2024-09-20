require('dotenv').config();
const express = require("express");
const router = require("./router/router");
const sequelize = require("./config/config");

const Evento = require("./models/Evento");
const Participante = require("./models/Participante");

const app = express();

app.use(express.json());
app.use("/", router);

// Corrigir o caminho de healthcheck
app.get("/healthcheck", (req, res) => {
    return res.status(200).json({
        msg: "Estamos vivos",
        alive: true
    });
});

// Definir as associações entre os modelos
Evento.hasMany(Participante, { foreignKey: 'eventoId' });
Participante.belongsTo(Evento, { foreignKey: 'eventoId' });

// Autenticar e sincronizar o Sequelize
sequelize
.authenticate()
.then(async () => {
    console.log("Conexão estabelecida com o banco de dados");
    await sequelize.sync(); // Sincronizar os modelos com o banco de dados
})
.then(() => {
    const port = process.env.PORT || 8080;  // Definir a porta usando a variável de ambiente ou 8080 como fallback
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
})
.catch((error) => {
    console.error("Erro ao conectar com o banco de dados", error);
});
