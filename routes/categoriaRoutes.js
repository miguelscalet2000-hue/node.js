const express = require("express");
const router = express.Router();

let categorias = [
    {
        id : 1,
        nome: "Scalet",
        descricao: "Miguel"
    },
    {
        id : 2,
        nome: "rasd_Verde",
        descricao: "Sendo um rasd"
    }
];


//rota
router.get("/", (req, res) => {
    res.status(200).json(categorias)
})


//rota por ID
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let categoria = categorias.find(cat => cat.id === id);

    if(!categoria){
        return res.status(404).json({
            mensagem: 'Categoria não encontrada'
        });
    }

    res.status(200).json(categoria);
})


//Salvar
router.post("/", (req, res) => {
    let{nome, descricao} = req.body;

    if(!nome){
        return res.status(400).json({
            mensagem : "O nome é obrigatório"
        });
    }

    let novoRegistro = {
        id: categorias.length + 1,
        nome,
        descricao
    };

    categorias.push(novoRegistro);
    res.status(201).json(novoRegistro);
});


//Editar
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let categoria = categorias.find(cat => cat.id === id);
    let{nome, descricao} = req.body;

    if(!categoria){
        return res.status(400).json({
            mensagem : "Categoria não encontrada"
        });
    }

    categoria.nome = nome;
    categoria.descricao = descricao;

    res.status(200).json({
        mensagem:"Categoria atualizada",
        categoria
    });
});

//excluir registro
    router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = categorias.findIndex((c) => c.id === id);

    if(indice === -1){
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    categorias.splice(indice, 1);
    res.status(200).json({
        mensagem: "Categoria removida com sucesso"
    });
});

module.exports = router;