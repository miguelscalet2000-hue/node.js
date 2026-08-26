const express = require("express");
const router = express.Router();

let clientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com"
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria@email.com"
  }
];

//rota
router.get("/", (req, res) => {
    res.status(200).json(clientes)
})

//rota por ID
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let cliente = clientes.find(cat => cat.id === id);

    if(!cliente){
        return res.status(404).json({
            mensagem: 'Cliente não encontrado'
        });
    }

    res.status(200).json(cliente);
})


//Salvar
router.post("/", (req, res) => {
    let{nome, email} = req.body;

    if(!nome){
        return res.status(400).json({
            mensagem : "O nome é obrigatório"
        });
    }

    let novoRegistro = {
        id: clientes.length + 1,
        nome,
        email
    };

    clientes.push(novoRegistro);
    res.status(201).json(novoRegistro);
});


//Editar
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let cliente = clientes.find(cat => cat.id === id);
    let{nome, email} = req.body;

    if(!cliente){
        return res.status(400).json({
            mensagem : "Cliente não encontrado"
        });
    }

    cliente.nome = nome;
    cliente.email = email;

    res.status(200).json({
        mensagem:"Cliente atualizado",
        cliente
    });
});
//excluir registro
    router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = clientes.findIndex((c) => c.id === id);

    if(indice === -1){
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        });
    }

    clientes.splice(indice, 1);
    res.status(200).json({
        mensagem: "Cliente removido com sucesso"
    });
});

module.exports = router;