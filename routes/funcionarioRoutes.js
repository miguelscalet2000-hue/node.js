const express = require("express");
const router = express.Router();

let funcionarios = [
 {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 99999-9999",
    email: "joao@email.com"
  },
  {
    id: 2,
    nome: "Maria Souza",
    telefone: "(21) 98888-8888",
    email: "maria@email.com"
  }
];

//rota
router.get("/", (req, res) => {
    res.status(200).json(funcionarios)
})

//rota por ID
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let funcionario = funcionarios.find(cat => cat.id === id);

    if(!funcionario){
        return res.status(404).json({
            mensagem: 'funcionario não encontrado'
        });
    }

    res.status(200).json(funcionario);
})


//Salvar
router.post("/", (req, res) => {
    let{nome, telefone, email} = req.body;

    if(!nome){
        return res.status(400).json({
            mensagem : "O nome é obrigatório"
        });
    }

    let novoRegistro = {
        id: funcionarios.length + 1,
        nome,
        telefone,
        email
    };

    funcionarios.push(novoRegistro);
    res.status(201).json(novoRegistro);
});


//Editar
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let funcionario = funcionarios.find(cat => cat.id === id);
    let{nome, telefone, email} = req.body;

    if(!funcionario){
        return res.status(400).json({
            mensagem : "funcionario não encontrado"
        });
    }

    funcionario.nome = nome;
    funcionario.telefone = telefone;
    funcionario.email = email;

    res.status(200).json({
        mensagem:"funcionario atualizado",
        funcionario
    });
});
//excluir registro
    router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = funcionarios.findIndex((c) => c.id === id);

    if(indice === -1){
        return res.status(404).json({
            mensagem: "Funcionario não encontrado"
        });
    }

    funcionarios.splice(indice, 1);
    res.status(200).json({
        mensagem: "Funcionario removido com sucesso"
    });
});

module.exports = router;