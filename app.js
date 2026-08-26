const express = require("express");
const app = express();

//permite que o server entenda o json
app.use(express.json());
//permite que o server entenda dados de um form HTML
app.use(express.urlencoded({extended: true}));

//importar rotas de categoria
const categoriaRoutes = require("./routes/categoriaRoutes");
//para utilizar as rotas de categoria
app.use("/categorias", categoriaRoutes);

//importar rotas de clientes
const clienteRoutes = require("./routes/clienteRoutes");
//para utilizar as rotas de cliente
app.use("/clientes", clienteRoutes);

//importar rotas de fornecedores
const fornecedorRoutes = require("./routes/fornecedorRoutes");
//para utilizar as rotas de fornedores
app.use("/fornecedores", fornecedorRoutes);

//importar rotas de funcionarios
const funcionarioRoutes = require("./routes/funcionarioRoutes");
//para utilizar as rotas de funcionarios
app.use("/funcionarios", funcionarioRoutes);

//rota principal
app.get("/", (req, res) =>{
    res.send("Servidor de Scalet")
})

app.listen(3000, () => {
    console.log("Servidor de Scalet http://localhost:3000");
});


