const express = require("express");
const router = express.Router();

let fornecedores = [
 {
    id: 1,
    nome: "Tech Distribuidora",
    telefone: "(11) 99999-9999"
  },
  {
    id: 2,
    nome: "Fornecedor Brasil",
    telefone: "(21) 98888-8888"
  }
];

//rota
router.get("/", (req, res) => {
    res.status(200).json(fornecedores)
})

//rota por ID
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let fornecedor = fornecedores.find(cat => cat.id === id);

    if(!fornecedor){
        return res.status(404).json({
            mensagem: 'fornecedor não encontrado'
        });
    }

    res.status(200).json(fornecedor);
})


//Salvar
router.post("/", (req, res) => {
    let{nome, telefone} = req.body;

    if(!nome){
        return res.status(400).json({
            mensagem : "O nome é obrigatório"
        });
    }

    let novoRegistro = {
        id: fornecedores.length + 1,
        nome,
        telefone
    };

    fornecedores.push(novoRegistro);
    res.status(201).json(novoRegistro);
});


//Editar
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let fornecedor = fornecedores.find(cat => cat.id === id);
    let{nome, telefone} = req.body;

    if(!fornecedor){
        return res.status(400).json({
            mensagem : "fornecedor não encontrado"
        });
    }

    fornecedor.nome = nome;
    fornecedor.telefone = telefone;

    res.status(200).json({
        mensagem:"fornecedor atualizado",
        fornecedor
    });
});
//excluir registro
    router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = fornecedores.findIndex((c) => c.id === id);

    if(indice === -1){
        return res.status(404).json({
            mensagem: "Fornecedor não encontrado"
        });
    }

    fornecedores.splice(indice, 1);
    res.status(200).json({
        mensagem: "Fornecedor removido com sucesso"
    });
});

module.exports = router;