require('dotenv').config();
const express = require("express");
const router = require("./router/router");
const sequelize = require("./config/config");

const Evento = require("./models/Evento");
const Participante = require("./models/Participante");

const app = express();

app.use(express.json());
app.use("/",router);
app.get("healthcheck",(req,res) => {
    return res.status(200).json({
        msg: "Estamos vivos",
        alive:true
    });
});

sequelize 

.authenticate()
.then(async () =>{
    console.log("Conexão estabelecida com o sistema");
    await sequelize.sync();
})
.then(() => {
    app.listen(process.env.PORT == null ? 8080 : process.env.PORT, () =>{
        console.log("Rodando na porta 8080");
    });
})
.catch((error) => {
    console.error("Erro ao conectar com o Banco", error);
});